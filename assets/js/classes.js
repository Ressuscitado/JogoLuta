class Character {
    _life = 1;
    maxLife = 1;
    atack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }
    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.atack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}
class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.atack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}
class LittleMonster extends Character {
    constructor() {
        super("Little Monster");
        this.life = 40;
        this.atack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}
class BigMonster extends Character {
    constructor() {
        super("Big Monster");
        this.life = 120;
        this.atack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }
    start() {
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }
    update() {
        //fighter1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;


        //fighter2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }
    doAttack(attacking, atacked) {
        if (atacked.life <= 0) {
            this.log.addMessage(`${atacked.name} Já morreu.`);
            if (attacking.life > 0) {
                this.log.addMessage(`${attacking.name} Está chutando cachorro morto.`);
            }
            return;
        }
    
        // Verifica se o atacante está morto
        if (attacking.life <= 0) {
            this.log.addMessage(`${attacking.name} Mortos não atacam.`);
            return;
        }
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);
        

        let actualAttack = (attacking.atack * attackFactor);
        let actualDefense = (atacked.defense * defenseFactor);
        
        if (actualAttack > actualDefense) {
            atacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${atacked.name}.`);
        }else {
            this.log.addMessage(`${atacked.name} conseguiu defender.`);
        }

        this.update();
    }
}
class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }
    render() {
        this.listEl.innerHTML = '';

        for( let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
        this.listEl.scrollTop = this.listEl.scrollHeight;
    }

}