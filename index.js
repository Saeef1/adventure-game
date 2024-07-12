#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let user = await inquirer.prompt({
    type: 'input',
    name: 'username',
    message: chalk.yellow('Enter your username ( Hint: Cool nick name or disqualified ):'),
});
let twist = 0;
let palyer = {
    username: user.username,
    health: 100,
    coins: 20,
    attack: 7,
    inventory: []
};
let monsters = [{
        name: "Goblin",
        attack: 5,
        health: 30,
        coins: 7,
        originalHealth: 30
    }, {
        name: "Wolf",
        attack: 10,
        health: 50,
        coins: 15,
        originalHealth: 50
    }, {
        name: "Demon king",
        attack: 20,
        health: 100,
        coins: 100,
        originalHealth: 100
    }];
async function fight(palyer = { attack: 0, health: 0, coins: 0 }, monster = { attack: 0, health: 0, originalHealth: 0, coins: 0 }) {
    while (true) {
        let palyerTurn = await inquirer.prompt({
            name: 'fight',
            type: 'list',
            choices: [chalk.redBright(`Attack`), chalk.redBright(`Run`)]
        });
        if (palyerTurn.fight === chalk.redBright(`Attack`)) {
            monster.health -= palyer.attack;
            console.log(chalk.cyan(`You did ${chalk.yellow.bold(palyer.attack)} damage. monster health is ${chalk.yellow.bold(monster.health)}`));
            palyer.health -= monster.attack;
            console.log(chalk.red(`Monster did ${chalk.yellow.bold(monster.attack)} damage. Your health is ${chalk.yellow.bold(palyer.health)}`));
            if (monster.health <= 0) {
                palyer.coins += monster.coins;
                console.log(chalk.yellow(`You killed the monster . You recived ${chalk.yellowBright.bold(monster.coins)} coins.`));
                monster.health = monster.originalHealth;
                return `victory`;
            }
            else if (palyer.health <= 0) {
                console.log(chalk.red(chalk.red.bold(`You died. Game over :(`)));
                return `Game Over`;
            }
        }
        else {
            console.log(chalk.whiteBright.bold(`You Ran like a horse`));
            return `fled`;
        }
    }
}
console.log(chalk.blue.bold(`Welcome ${palyer.username} .`));
async function adventure() {
    let journey = await inquirer.prompt({
        name: 'journey',
        type: 'list',
        choices: [chalk.yellow.italic('Explore'), chalk.yellow.italic('Player stats'), chalk.yellow.italic('Store')],
        message: chalk.green(`where whould you like to go`)
    });
    while (journey.journey == chalk.yellow.italic('Store')) {
        let items = await inquirer.prompt({
            name: 'item',
            type: 'list',
            message: chalk.yellow('Choose an item to buy'),
            choices: [chalk.italic.magentaBright(`Healing 20 coins`), chalk.italic.magentaBright(`Woden shovel 21 coins`), chalk.italic.magentaBright(`Sliver sword 30 coins`), chalk.italic.magentaBright(`Daimond axe 60 coins`), chalk.italic.magentaBright(`Thor hammer 200 coins`), chalk.italic.magentaBright(`Exit store`)]
        });
        if (items.item === chalk.italic.magentaBright(`Healing 20 coins`)) {
            if (palyer.coins >= 20) {
                palyer.health += 20;
                palyer.coins -= 20;
                console.log(chalk.whiteBright(`You recived 20 Healing`));
            }
            else {
                console.log(chalk.red.bold(`Not enough money`));
            }
        }
        else if (palyer.inventory.includes(items.item)) {
            console.log(chalk.yellow.bold(`You already have this item`));
        }
        else {
            if (items.item === chalk.italic.magentaBright(`Woden shovel 21 coins`)) {
                if (palyer.coins >= 21) {
                    palyer.attack += 5;
                    palyer.coins -= 21;
                    palyer.inventory.push(`Woden shovel 21 coins`);
                    console.log(chalk.bold(`You recived ${chalk.yellow(`Wodden shovel`)} .Your attack is now ${palyer.attack}`));
                }
                else {
                    console.log(chalk.red.bold(`Not enough money`));
                }
            }
            else if (items.item === chalk.italic.magentaBright(`Sliver sword 30 coins`)) {
                if (palyer.coins >= 30) {
                    palyer.attack += 10;
                    palyer.coins -= 30;
                    palyer.inventory.push(`Sliver sword 30 coins`);
                    console.log(chalk.bold(`You recived ${chalk.gray.bold(`Sliver sword`)} .Your attack is now ${palyer.attack}`));
                }
                else {
                    console.log(chalk.red.bold(`Not enough money`));
                }
            }
            else if (items.item === chalk.italic.magentaBright(`Daimond axe 60 coins`)) {
                if (palyer.coins >= 60) {
                    palyer.attack += 15;
                    palyer.coins -= 60;
                    palyer.inventory.push(`Daimond axe 60 coins`);
                    console.log(chalk.bold(`You recived ${chalk.cyan(`Daimond axe`)} .Your attack is now ${palyer.attack}`));
                }
                else {
                    console.log(chalk.red.bold(`Not enough money`));
                }
            }
            else if (items.item === chalk.italic.magentaBright(`Thor hammer 200 coins`)) {
                if (palyer.coins >= 200) {
                    palyer.attack += 100;
                    palyer.coins -= 200;
                    palyer.inventory.push(`Thor hammer 200 coins`);
                    console.log(chalk.bold(`You recived ${chalk.blue(`Thor hammer`)} .Your attack is now ${palyer.attack}`));
                }
                else {
                    console.log(chalk.red.bold(`Not enough money`));
                }
            }
            else {
                adventure();
                break;
            }
        }
    }
    if (journey.journey === chalk.yellow.italic('Player stats')) {
        console.log(palyer);
        adventure();
    }
    while (journey.journey === chalk.yellow.italic('Explore')) {
        let des = await inquirer.prompt({
            name: `destination`,
            type: `list`,
            message: chalk.green(`Where do you want to go?`),
            choices: [chalk.green(`forest`), chalk.gray.bold(`cave`), chalk.redBright.bold(`near volcano`), chalk.yellow(`Go home`)]
        });
        if (des.destination == chalk.green(`forest`)) {
            console.log(`You arrived at the Forest`);
            console.log(`You encountered '${monsters[0].name}' .`);
            let boss1 = await fight(palyer, monsters[0]);
            if (boss1 === "Game Over") {
                break;
            }
        }
        else if (des.destination == chalk.gray.bold(`cave`)) {
            console.log(chalk.cyan.bold(`You arrived at the darkest Cave`));
            console.log(`You encountered '${monsters[1].name}' .`);
            let boss2 = await fight(palyer, monsters[1]);
            if (boss2 === "Game Over") {
                break;
            }
        }
        else if (des.destination == chalk.redBright.bold(`near volcano`)) {
            console.log(`You arrived at the Peak of the Volcano`);
            console.log(`You encountered '${monsters[2].name}' .`);
            const boss3 = await fight(palyer, monsters[2]);
            if (boss3 === "Game Over") {
                break;
            }
            else if (boss3 === `victory` && twist == 0) {
                console.log(`${chalk.yellow(`Game master:`)} You didn't won the game LOL `);
                twist += 1;
            }
            else if (boss3 === `victory` && twist == 1) {
                console.log(`${chalk.yellow(`Game master:`)} Why are you still playing?.this game won't end`);
                twist += 1;
            }
            else if (boss3 === `victory` && twist == 2) {
                console.log(chalk.redBright.bold(`${chalk.yellow(`Game master:`)} last WARNING!!!`));
                twist += 1;
            }
            else if (boss3 === `victory` && twist == 3) {
                console.log(chalk.italic.grey(`Recived an secret item`));
                twist += 1;
                palyer.inventory.push(`Game Broker`);
                console.log(`${chalk.yellow(`Game master:`)}  Don't use that item.`);
            }
            else if (boss3 === `victory` && twist == 4) {
                console.log(`You deafeat the Game Master and broke the forth wall`);
                console.log(chalk.bold.greenBright(`${chalk.yellow(`Game master:`)}  You Won . Congrats`));
                break;
            }
        }
        else {
            adventure();
            break;
        }
    }
}
adventure();
