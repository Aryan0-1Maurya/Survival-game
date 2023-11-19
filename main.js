/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

'use-strict';


const model = {
  items: [
    {name: 'woods', number: 10}, // 0
    {name: 'food', number: 1},
    {name: 'water', number: 10},
    {name: 'cloth', number: 30}, // 3
    {name: 'fences', number: 0, set: [['woods', 5]],
      get: [['defences', 1], ['comfort', 2]]}, // 4
    {name: 'waterclt', number: 0, set: [['woods', 50], ['cloth', 20]],
      get: [['comfort', 10]]}, // 5
    {name: 'torch', number: 0, set: [['woods', 10]],
      get: [['defense', 2], ['comfort', 10]]}, // 6
    {name: 'trap', number: 0, set: [['woods', 20]],
      get: [['defense', 5], ['comfort', 10]]},
  ],
  player: {
    woods: 10,
    food: 10,
    money: 100,
    defense: 10,
    comfort: 0,
    water: 10,
  },
  ID: ['story'],
};

const startView = {
  init() {
    document
        .getElementById('start-button')
        .addEventListener('click', () => storyView.init());
  },
};

const storyView = {
  init() {
    const text = document.getElementById('story');
    this.storyButton = document.getElementById('story-button');
    this.storyButton.style.display = 'block';
    this.storyButton.addEventListener('click', () => homeView.init());
    Array.from(document.getElementsByClassName('start'))
        .forEach((stp) => stp.style.display = 'none');

    text.innerHTML = `Its been two weeks after 'those' thing show up and cause
        my whole live ruined , my whole family .... die one by one ..... and all i
        can do is just stand beside them helplessly ,seing them been eaten and
        become one of them ....... 'Run for your live' this selfish action make me
        regret leaving them behind without trying to protect them ..... Now i wonder
        why i didn't stay there and die with all of them as i will not suffer this
        much and strugle to live in a world with those who suppose to lay down in a
        hard wodden box burried underground
    ...`;
  },
};

const alertView = {
  init() {
    this.alertElem = document.getElementById('alert');
    this.alertTitleElem = document.getElementById('alert-title');
    this.alertTextElem = document.getElementById('alert-text');
    this.alertButtonElem = document.getElementById('alert-button');
    this.alertButtonElem.addEventListener('click', () => {
      this.alertElem.style.display = 'none';
    });
  },
  render(object) {
    const {
      title,
      text,
      submit = 'Submit',
    } = object;
    this.alertElem.style.display = 'flex';
    this.alertTitleElem.innerHTML = title;
    this.alertTextElem.innerHTML = text;
    this.alertButtonElem.innerHTML = submit;
  },
};

const homeView = {
  init() {
    const player = model.player;
    this.woodsElem = document.getElementById('woods');
    this.foodsElem = document.getElementById('foods');
    this.waterElem = document.getElementById('water');
    this.residentElem = document.getElementsByClassName('resident')[0];
    this.navbarElem = document.getElementsByClassName('navbar');
    this.forestElem = document.getElementsByClassName('forest');
    this.homeElem = document.getElementsByClassName('home');

    this.watercollectorElem = document.getElementById('watercollectorbtn');
    this.navbarResidentElem = document.getElementById('navbar-resident');
    this.navbarForestElem = document.getElementById('navbar-forest');
    this.navbarHomeElem = document.getElementById('navbar-home');
    this.infoButton = document.getElementById('info-button');
    this.campfireElem = document.getElementById('campfire');
    this.fencesElem = document.getElementById('fences');
    this.trapElem = document.getElementById('trapup');

    this.watercollectorElem
        .addEventListener('click', () => octopus.buildItem(model.items[5]));
    this.campfireElem
        .addEventListener('click', () => octopus.buildItem(model.items[6]));
    this.fencesElem
        .addEventListener('click', () => octopus.buildItem(model.items[4]));
    this
        .trapElem
        .addEventListener('click', () => octopus.buildItem(model.items[7]));
    this.navbarResidentElem
        .addEventListener('click', () => residentView.init());
    this.navbarForestElem
        .addEventListener('click', () => forestView.init());
    this.navbarHomeElem
        .addEventListener('click', () => homeView.render());
    this.infoButton
        .addEventListener('click', () => infoView.init());

    homeView.render();
    Array.from(document.getElementsByClassName('story'))
        .forEach((stp) => stp.style.display = 'none');

    document.getElementsByTagName('a')[1].style.display = 'none';
    document.getElementsByTagName('a')[2].style.display = 'none';

    alertView.render({
      title: 'INTRODUCTION',
      text: `Well here I am in a dark lonely house. What can I do to continue
      live in this terrible world?!`,
    });

    setInterval(() => {
      this.woodsElem.innerHTML = 'Woods : ' + ++player.woods;
    }, 5500); // 5.5 seconds

    setInterval(() => {
      waterElem.innerHTML = 'Water : ' + --player.water;
      foodsElem.innerHTML = 'Food : ' + --player.food;
    }, 120000);

    setInterval(() => {
      model.items.forEach((item) => {
        `${item.name}`.innerHTML = `${item.name}` + item.number;
      });
    }, 1000);

    // make a food generator with trap
    setInterval(() => {
      if (model.trap > 0) {
        player.food = player.food + (model.trap * 1);
        foodsElem.innerHTML = 'Foods : ' + player.food;
      }

      if (model.waterclt > 0) {
        player.water = player.water + (model.waterclt * 1);
        waterElem.innerHTML = 'Water : ' + player.water;
      }
    }, 20000); // 2 minute

    // make the trap broke once a while
    setInterval(() => {
      const num = Math.floor(Math.random() * 2);
      if (model.trap > 0 && num > 0) {
        model.trap--;
        alertView.render('DESTROYED', 'One of your trap is broken.');
        // comfort -= 10;
      }
    }, 40000); // 4 Minutes

    // Wald freischalten
    setTimeout(() => {
      alertView.render({
        title: 'FOREST',
        text: `While you're wandering near your window you found out that
                there's a forest near your safe house`,
      });
      alertView.render({
        title: 'FOREST',
        text: 'Hmm... I think I can find many woods there',
      });
      document.getElementsByTagName('a')[1].style.display = 'inline';
    }, 3000); // 3 Seconds change later

    // Resident freischalten
    setTimeout(() => {
      alertView.render({
        title: 'RESIDENT',
        text: `While you're collecting some woods you saw some abandoned house
                near your safe house. Maybe i can find some food and water there .....oh
                and some cloth i guess`,
      });
      document.getElementsByTagName('a')[2].style.display = 'inline';
    }, 10000); // 1 Minute
  },
  render() {
    this.forestElem[0].style.display = 'none';
    this.homeElem[0].style.display = 'none';
    this.residentElem.style.display = 'home';
    Array.from(this.homeElem).forEach((stp) => stp.style.display = 'block');
    this.navbarElem[0].style.display = 'flex';

    this.fencesElem.style.display = 'block';
    this.campfireElem.style.display = 'block';
    this.trapElem.style.display = 'block';
    this.watercollectorElem.style.display = 'block';
    this.woodsElem.innerHTML = 'Woods : ' + model.player.woods;
  },
};

const infoView = {
  init() {
    alertView.render({
      title: 'Credits',
      text: `I created the project with ValentinHacker and LeonLit \n The images
      are from Evolve Wallpapers`,
      submit: 'CLOSE',
    });
  },
};

const signinView = {
  init() {
    // hide other szenes
    document.getElementsByClassName('forest')[0].style.display = 'none';
    document.getElementsByClassName('resident')[0].style.display = 'none';
    document.getElementsByClassName('home')[0].style.display = 'none';
    Array.from(document.getElementsByClassName('signin'))
        .forEach((stp) => stp.style.display = 'block');
  },
};

const createUser = {
  init() {
    alertView.render({
      title: 'In work',
      text: 'Sorry this feature isn\'t avaible now please stay turned!',
      type: 'info',
      confirmButtonText: 'Okay',
    });
  },
};

const forestView = {
  init() {
    document.getElementsByClassName('home')[0].style.display = 'none';
    document.getElementById('forestlist').style.display = 'block';
    document.getElementById('forest-search-button')
        .addEventListener('click', this.search);

    Array.from(document.getElementsByClassName('forest'))
        .forEach((stp) => stp.style.display = 'block');

    Array.from(document.getElementsByClassName('home'))
        .forEach((stp) => stp.style.display = 'none');

    Array.from(document.getElementsByClassName('upgrade'))
        .forEach((stp) => stp.style.display = 'none');

    Array.from(document.getElementsByClassName('resident'))
        .forEach((stp) => stp.style.display = 'none');

    document.getElementById('craft').style.display = 'none';
  },
  search() {
    const player = model.player;
    const searchProgress = document.getElementsByTagName('progress')[0];
    if (searchProgress.value === 0) {
      const woodsText = document.getElementById('woods');
      const residentText = document.getElementById('residenttxt');
      const collectwoodButton = document.getElementById('forest-search-button');
      collectwoodButton.style.opacity = '0.5';

      const collectInterval = setInterval(() => {
        if (searchProgress.value <= 100) {
          searchProgress.value++;
        }

        if (searchProgress.value == 100) {
          collectwoodButton.style.opacity = '1';
          alertView.render({
            title: 'Finished',
            text: 'You finished searching in the forest',
            confirmButtonText: 'Okay!',
          });

          if (woodsText.style.display === 'none' &&
            residentText.style.display === 'none') {
            collectwoodButton.style.display = 'block';
          }

          searchProgress.value = 0;
          clearInterval(collectInterval);

          player.food += Math.round(Math.random() * (5 - 1) + 1);
          player.water += Math.round(Math.random() * (20 - 10) + 10);
          player.woods += Math.round(Math.random() * (5 - 1) + 1);
          player.cloth += Math.round(Math.random() * (6 - 2) + 2);
        }
      }, 500);
    }
  },
};

const residentView = {
  init() {
    document.getElementsByClassName('home')[0].style.display = 'none';
    document.getElementById('residentlist').style.display = 'block';
    document.getElementById('craft').style.display = 'none';
    document.getElementById('resident-search-button')
        .addEventListener('click', this.search);

    Array.from(document.getElementsByClassName('resident'))
        .forEach((stp) => stp.style.display = 'block');

    Array.from(document.getElementsByClassName('forest'))
        .forEach((stp) => stp.style.display = 'none');

    Array.from(document.getElementsByClassName('home'))
        .forEach((stp) => stp.style.display = 'none');
  },
  search() {
    const searchProgress = document.getElementsByTagName('progress')[1];
    if (searchProgress.value == 0) {
      const woodsText = document.getElementById('woods');
      const resourceText = document.getElementById('forestlist');
      const searchButton = document.getElementById('resident-search-button');

      searchButton.style.opacity = '0.5';
      const collectInterval = setInterval(() => {
        if (searchProgress.value <= 100) {
          searchProgress.value++;
        }

        if (searchProgress.value == 100) {
          searchButton.style.opacity = '1';
          alertView.render({
            title: 'Finished',
            text: 'You finish searching the resident near your safe house.',
          });

          if (woodsText.style.visibility == 'hidden' &&
            resourceText.style.visibility == 'hidden') {
            searchButton.style.display = 'block';
          }
          searchProgress.value = 0;
          clearInterval(collectInterval);

          model.food += Math.round(Math.random() * (8 - 3) + 3);
          model.water += Math.round(Math.random() * (20 - 10) + 10);
          model.woods += Math.round(Math.random() * (10 - 5) + 5);
          model.cloth += Math.round(Math.random() * (15 - 5) + 5);
        }
      }, 500);
    }
  },
};

const octopus = {
  init() {
    startView.init();
    alertView.init();
  },
  money() {
    alertView.render('FAILED', 'You haven\'t enough requierments');
  },

  buildItem(item) {
    if (item.set.every((elem) => 0 <= (model.player[`${elem[0]}`] - elem[1]))) {
      item.set.forEach((elem) => model.player[`${elem[0]}`] -= elem[1]);
      item.number++;
      homeView.render();
      console.log('Well done! You bought this item ^^');
    } else {
      console.log('I guess you haven\'t enough resources Michael');
    }
  },
};

onload = () => octopus.init();


/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/