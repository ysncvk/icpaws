import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Result "mo:base/Result";



actor ICPaws {
  public query (message) func greet() : async Principal {
    message.caller
  };
  /**
   * Types for User
   */

  public type Result<T, E> = Result.Result<T, E>;

  public type User = {
    name: Text;
    avatar: Text;
  };

  /**
   * Application State for User
   */

  private stable var users : Trie.Trie<Principal, User> = Trie.empty();

  /**
   * High-Level API for User
   */

  // Register a User
  public  shared (msg)func  signUpWithInternetIdentity() : async Bool {

    let result=Trie.find(users, userKey(msg.caller), Principal.equal);
    let exists = Option.isSome(result);
    
    
    // Control whether the user exists
    if (exists) {
      return false; // User is already registered
    };
    
    // Create new User
    let newUser = { name = ""; avatar = "" };
    users := Trie.replace(users, userKey(msg.caller), Principal.equal, ?newUser).0;
    
    return true; // New user created!
  };

  // Update a User 
  public  func updateUser (user:User, caller: Principal): async Bool {
    let result = Trie.find(users, userKey(caller),Principal.equal);
    let exists = Option.isSome(result);
    if(exists) {
      users := Trie.replace(
        users,
        userKey(caller),
        Principal.equal,
        ?user,
      ).0;
    };
    return exists;
  };
 
  // Delete a User
  public shared func deleteUser(caller:Principal) : async Bool {
     let result = Trie.find(users, userKey(caller),Principal.equal);
    let exists = Option.isSome(result);
    if(exists) {
      users := Trie.replace(
        users,
        userKey(caller),
        Principal.equal,
        null,
      ).0;
    };
    return exists;

  };

  // Get the current user based on the caller's principal
  public query func getCurrentUser(caller:Principal) : async ?User {
    let result = Trie.find(users, userKey(caller), Principal.equal);
    return result;
  };
  
  // Get All Users

  public query func listUsers() : async [(Principal, User)] {
  return Trie.toArray<Principal, User, (Principal, User)>(
    users,
    func (k, v) : (Principal, User) {
      (k, {userId = k; name = v.name; avatar = v.avatar})
    }
  );
};



  /**
   * Types for Pet
   */

  // The type of a pet identifier.
  public type PetId = Nat32;

  // The type of a pet.
  public type Pet = {
    name: Text;
    species : Text;
    breed : Text;
    gender: Text;
    image: Text;
    owner: Principal;
  };

  public type ResponsePet = {
    name: Text;
    species : Text;
    breed : Text;
    gender: Text;
    image: Text;
    id: Nat32;
    owner: Principal;
  };
  
  /**
   * Application State for Pet
   */

  // The next available Pet identifier.
  private stable var next : PetId = 0;

  // The pet data store.
  private stable var pets : Trie.Trie<PetId, Pet> = Trie.empty();

  /**
   * High-Level API for Pets
   */



  // Create a pet.
public func createPet(pet: Pet) : async Bool {
    
  
    // Pet için bir kimlik oluştur
    let petId = next;
    next += 1;
    
    // Peti kullanıcının kimliğiyle ilişkilendir
  
    pets := Trie.replace(pets, key(petId), Nat32.equal, ?pet).0;
    
    // Oluşturulan petin kimliğini başarıyla döndür
    return true;
};

 // get current user pets
  public func getUserPets(caller:Principal) : async [(ResponsePet)] {
  let filteredPets: Trie.Trie<PetId, Pet> = Trie.filter<PetId, Pet>(pets, func (key: PetId, pet: Pet)  { pet.owner == caller});
  // Convert the filtered trie to a list of Pet objects
  return Trie.toArray<PetId, Pet, ResponsePet>(
    filteredPets,
    func (k, v) : (ResponsePet) {
      {id = k; name= v.name; species = v.species; breed = v.breed; gender = v.gender; image = v.image; owner= v.owner}
    }
  );
};
  // Read a pet.
  public query func read(petId : PetId) : async ? Pet {
    let result = Trie.find(pets, key(petId), Nat32.equal);
    return result;
  };

  // Update a pet.
  public func update(petId : PetId, pet : Pet) : async Bool {
    let result = Trie.find(pets, key(petId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      pets := Trie.replace(
        pets,
        key(petId),
        Nat32.equal,
        ?pet,
      ).0;
    };
    return exists;
  };

  // Delete a pet.
  public func delete(petId : PetId) : async Bool {
    let result = Trie.find(pets, key(petId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      pets := Trie.replace(
        pets,
        key(petId),
        Nat32.equal,
        null,
      ).0;
    };
    return exists;
  };


    // List all pets 
public query func list() : async [(ResponsePet)] {
  return Trie.toArray<PetId, Pet, ResponsePet>(
    pets,
    func (k, v) : (ResponsePet) {
      {id = k; name= v.name; species = v.species; breed = v.breed; gender = v.gender; image = v.image; owner= v.owner}
    }
  );
};

  /**
   * Utilities
   */

  // Create a trie key from a superhero identifier. (Parameter is a Nat32 tyoe)
  private func key(x : PetId) : Trie.Key<PetId> {
    return { hash = x; key = x };
  };
  
   // Create a trie key from a useridentifier. (Parameter is a Principal Type)
  private func userKey(x : Principal) : Trie.Key<Principal> {
    return { hash = Principal.hash x; key = x };
  };
  
  
  
};