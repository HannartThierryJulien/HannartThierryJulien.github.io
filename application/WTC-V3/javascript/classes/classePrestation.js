

/***********************************************************************************************/
// Classe Prestation
/***********************************************************************************************/


class Prestation {
    constructor() {
        this.id = 0;
        this.idClient = 0;
        this.duree = 0;
        this.tarif = 0;
        this.description = "";
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setIdClient(idClient) {
        this.idClient = idClient;
    }

    getIdClient() {
        return this.idClient;
    }

    setDuree(duree) {
        this.duree = duree;
    }

    getDuree() {
        return this.duree;
    }

    setTarif(tarif) {
        this.tarif = tarif;
    }

    getTarif() {
        return this.tarif;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    toString() {
        return (this.id + " " + this.idClient + " " + this.duree + " " + this.tarif + " " + this.description);
    }
}


/***********************************************************************************************/
// Export de la classe Prestation
/***********************************************************************************************/


export { Prestation };