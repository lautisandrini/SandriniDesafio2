const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.objects = this.readData(this.fileName) || [];
    }
    
    async generateId() {
        try {
            this.objects = await this.getAll() || [];
            let maxId = this.objects.length;
            this.objects.forEach(el => {el.id > maxId ? maxId = el.id : maxId})
            return maxId + 1;
        } catch (error) {
            console.log(error);
        }
    }
    
    async save(obj) {
        try {
            const readFile = await this.getAll();
            if (!readFile) {
                obj.id = await this.generateId();
                this.objects.push(obj);
                this.writeData(this.objects);
                return obj.id;
            }
            this.objects = readFile;
            obj.id = await this.generateId();
            this.objects.push(obj);
            this.writeData(this.objects);
            return obj.id;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getById(id) {
        try {
            this.objects = await this.getAll();
            const obj = this.objects.find(el => el.id === Number(id));
            return obj ? obj : null;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getAll() {
        try {
            const data = await this.readData(this.fileName);
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    
    async deleteById(id) {
        try {
            this.objects = await this.getAll();
            this.objects = this.objects.filter(el => el.id != Number(id));
            this.writeData(this.objects);
        } catch (err) {
            console.log(err);
        }
    }
    
    async deleteAll() {
        try {
            this.objects = await this.getAll();
            this.objects = [];
            this.writeData(this.objects);
        } catch (err) {
            console.log(err);
        }
    }
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    }
    writeData(objects) {
        fs.writeFileSync(this.fileName, JSON.stringify(objects, null, 2));
    }
}

module.exports = Contenedor;