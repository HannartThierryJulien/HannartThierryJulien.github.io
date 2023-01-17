

/***********************************************************************************************/
// Classe Tarif
/***********************************************************************************************/


class Tarif {
    constructor() {
        this.id = 0;
        this.nom = "";
        this.description = "";
        this.montantParHeure = 0;
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

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setMontantParHeure(montantParHeure) {
        this.montantParHeure = montantParHeure;
    }

    getMontantParHeure() {
        return this.montantParHeure;
    }

    toString() {
        return (this.id + " " + this.nom + " " + this.description + " " + this.montantParHeure);
    }
}


/***********************************************************************************************/
// Export de la classe Tarif
/***********************************************************************************************/


export { Tarif };