interface prInterfaceofile {
    name : string;
    age : number;
    role : string;
    isAvailable : boolean;
    skills: string[];
}

function ProfileCard ({
    name,
    age,
    role,
    isAvailable,
    skills

} : prInterfaceofile ){

    return (
        <div>
            <h2>{name}</h2>
            <p>{role}</p>
            <p>{age}</p>
            <p>Status: {isAvailable ? "Available" : "Not Available"}</p>

             <h3>Skills:</h3>

            <ul>
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>

        </div>
    );
}

export default ProfileCard;

  

