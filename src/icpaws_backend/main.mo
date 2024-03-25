import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Blob "mo:base/Blob";

actor ICPaws {

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
  };

  /**
   * Application State
   */

  // The next available Pet identifier.
  private stable var next : PetId = 0;

  // The pet data store.
  private stable var pets : Trie.Trie<PetId, Pet> = Trie.empty();

  /**
   * High-Level API
   */

  // Create a pet.
  public func create(pet: Pet) : async PetId {
    let petId = next;
    next += 1;
    pets := Trie.replace(
      pets,
      key(petId),
      Nat32.equal,
      ?pet,
    ).0;
    return petId;
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
      {petId = k; name= v.name; species = v.species; breed = v.breed; age = v.age; gender = v.gender; adoption = v.adoption; place = v.place; description = v.description; image = v.image}
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
};