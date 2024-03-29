import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Result "mo:base/Result";
import List "mo:base/List";



actor ICPaws {

 
  public query (message) func greet() : async Text {
    return "Hoşgeldin, " # Principal.toText(message.caller) # "!";
  };
  
  public type Result<T, E> = Result.Result<T, E>;

  public type UserId= Principal;

  public type User = {
  
    name: Text;
    avatar: Text;
  };

  /**
   * Application State
   */

  private stable var users : Trie.Trie<UserId, User> = Trie.empty();

  /**
   * High-Level API
   */

  // Kullanıcıyı Internet Identity ile kaydet
  public func signUpWithInternetIdentity(caller: Principal) : async UserId {

    let result=Trie.find(users, userKey(caller), Principal.equal);
    let exists = Option.isSome(result);
    
    
    // Kullanıcıyı daha önce kaydetmişsek hata döndür
    if (exists) {
      return caller; // Kullanıcı zaten kayıtlı
    };
    
    // Yeni kullanıcıyı oluştur
    let newUser = { name = ""; avatar = "" };
    users := Trie.replace(users, userKey(caller), Principal.equal, ?newUser).0;
    
    return caller; // Yeni kullanıcı başarıyla kaydedildi
  };
  /**
   * Types
   */

  // The type of a pet identifier.
  public type PetId = Nat32;

  // The type of a pet.
  public type Pet = {
    name: Text;
    species : Text;
    breed : Text;
    age: Text;
    gender: Text;
    adoption: Text;
    place: Text;
    description: Text;
    image: Text;
    ownerId: UserId;
  };
  
  type List <Pet> = ?(Pet,List<Pet>);

    

  /**
   * Application State for Prt
   */

  // The next available Pet identifier.
  private stable var next : PetId = 0;

  // The pet data store.
  private stable var pets : Trie.Trie<PetId, Pet> = Trie.empty();

  /**
   * High-Level API for Pets
   */

  private func isUserLoggedIn(caller: Principal) : Bool {
    return Option.isSome(Trie.find(users, userKey(caller), Principal.equal));
  };

  // Create a pet.
  public func createPet(pet: Pet, caller: Principal) : async Result<PetId, Text> {
    // Kullanıcı giriş yapmamışsa hata döndür
    if (isUserLoggedIn(caller)) {
        return Err("Lütfen önce giriş yapın.");
    };
    
    // Pet için bir kimlik oluştur
    let petId = next;
    next += 1;
    
    // Peti kullanıcının kimliğiyle ilişkilendir
    let petWithOwner = { pet with ownerId = caller };
    pets := Trie.replace(pets, key(petId), Nat32.equal, ?petWithOwner).0;
    
    // Oluşturulan petin kimliğini başarıyla döndür
    return Ok(petId);
};
  public func getUserPets(caller: Principal) : async [Pet] {
  let filteredPets: Trie.Trie<PetId, Pet> = Trie.filter<PetId, Pet>(
  pets,
  func (key: PetId, pet: Pet) : Bool {
    return Principal.equal(pet.ownerId, caller);
  }
);
  // Convert the filtered trie to a list of Pet objects
  let petList: [Pet] = Trie.toArray<PetId, Pet, Pet>(filteredPets, func(key: PetId, pet: Pet) :Pet {
    return pet; // Return the pet object itself
  });

  return petList;
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


    // List all pets with pagination.
public query func list() : async [Pet] {
  return Trie.toArray<PetId, Pet, Pet>(
    pets,
    func (k, v) : Pet {
      {petId = k; name= v.name; species = v.species; breed = v.breed; age = v.age; gender = v.gender; adoption = v.adoption; place = v.place; description = v.description; image = v.image; ownerId= v.ownerId}
    }
  );
};


  /**
   * Utilities
   */

  // Create a trie key from a superhero identifier.
  private func key(x : PetId) : Trie.Key<PetId> {
    return { hash = x; key = x };
  };

  private func userKey(x : UserId) : Trie.Key<UserId> {
    return { hash = Principal.hash x; key = x };
  };
  
  
  
};