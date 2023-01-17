

/***********************************************************************************************/
// Classe Client
/***********************************************************************************************/


class Client {
    constructor() {
        this.id = 0;
        this.nom = "";
        this.prenom = "";
        this.adresse = "";
        this.description = "";
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setNom(nom) {
        this.nom = nom;
    }

    getNom() {
        return this.nom;
    }

    setPrenom(prenom) {
        this.prenom = prenom;
    }

    getPrenom() {
        return this.prenom;
    }

    setAdresse(adresse) {
        this.adresse = adresse;
    }

    getAdresse() {
        return this.adresse;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    toString() {
        return (this.id + " " + this.nom + " " + this.prenom + " " + this.adresse + " " + this.description);
    }
}


/***********************************************************************************************/
// Export de la classe Client
/***********************************************************************************************/


export { Client };