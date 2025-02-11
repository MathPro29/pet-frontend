export default async function Page() {
    const response = await fetch("http://127.0.0.1:8000/api/pets");
    const pets = await response.json();
    return (
      <>
        <ul>
          {pets.data.map((pet) => (
            <li key={pet.id}>{pet.name}- {pet.species}</li>
          ))}
        </ul>
      </>
    );
  }
  