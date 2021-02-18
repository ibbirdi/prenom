// un objet 'prenoms' contenant les données de 227424 prénoms est contenu dans un autre fichier JS

const app = {
  // la liste des prénoms sera stockée ici
  resultat: [],
  compteur: 0,

  compteurNode: document.getElementById('compteur-resultats'),
  form: document.getElementById('main-form'),
  resultsContainer: document.getElementById('results-container'),
  inputForbiddenLetters: document.getElementById('lettres-interdites'),
  inputMandatoryLetters: document.getElementById('lettres-obligatoires'),
  inputFirstNameLength: document.getElementById('longueur-prenom'),

  // pour convertir la string de lettres interdites en array et supprimer les accents et majuscules éventuels
  convertString: (string) => {
    let finalString = string.toLowerCase();
    finalString = finalString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return finalString.split('');
  },

  init() {
    app.form.addEventListener('submit', app.showResults);
  },

  // tester que le prenom ne contient pas au moins une des lettres interdites
  notLetters: (testString, letters) => {
    const testStringArray = app.convertString(testString);
    const lettersArray = app.convertString(letters);
    const intersection = testStringArray.filter((x) =>
      lettersArray.includes(x)
    );
    // console.log('inter notLetters', intersection);
    if (intersection == '') {
      return true;
    } else {
      return false;
    }
  },

  containsLetters: (testString, letters) => {
    // tester que le prenom contient les lettres obligatoires
    const testStringArray = app.convertString(testString);
    const lettersArray = app.convertString(letters);
    return lettersArray.every((x) => testStringArray.includes(x));
  },

  lengthCheck: (testString, desiredLength) => {
    if (!desiredLength) {
      return true;
    }
    if (testString.length === desiredLength) {
      return true;
    } else {
      return false;
    }
  },

  // trouver les bons prénoms
  findPrenom: (firstNameLength, forbiddenLetters, mandatoryLetters) => {
    console.log(
      'parametres de findPrenom : ', // tout est ok ici
      firstNameLength,
      forbiddenLetters,
      mandatoryLetters
    );
    app.resultat.length = 0; //réinit le résultat
    app.compteur = 0;
    console.log('reinit', app.resultat);

    for (let i = 0; i < prenoms.length; i++) {
      if (
        app.lengthCheck(prenoms[i].prenom, firstNameLength) &&
        app.notLetters(prenoms[i].prenom, forbiddenLetters) &&
        app.containsLetters(prenoms[i].prenom, mandatoryLetters)
      ) {
        app.resultat.push(prenoms[i]);
        app.compteur++;
      }
    }
  },

  showResults(e) {
    e.preventDefault(); //on empeche la page de se recharger

    app.resultsContainer.innerHTML = ''; //reset de l'affichage

    console.log(
      'valeurs récupérées dans la form',
      parseInt(app.inputFirstNameLength.value),
      app.inputForbiddenLetters.value,
      app.inputMandatoryLetters.value
    );

    app.findPrenom(
      parseInt(app.inputFirstNameLength.value),
      app.inputForbiddenLetters.value,
      app.inputMandatoryLetters.value
    );

    if (app.resultat.length <= 1000 && app.resultat.length > 0) {
      for (i = 0; i < app.resultat.length; i++) {
        let result = document.createElement('div');
        result.classList.add('result');
        if (app.resultat[i].sexe == 'M') {
          result.classList.add('boy');
        } else {
          result.classList.add('girl');
        }
        result.textContent = app.resultat[i].prenom;
        app.resultsContainer.appendChild(result);
        app.compteurNode.textContent = app.compteur + ' prénom(s) trouvé(s)';
      }
    } else if (app.resultat.length == 0) {
      app.compteurNode.textContent = 'Aucun prénom trouvé';
    } else {
      app.compteurNode.textContent =
        'Trop de résultats ! Affinez votre recherche';
    }
  },
};

app.init();
