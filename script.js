// un objet 'prenoms' contenant les données de 227424 prénoms est contenu dans un autre fichier JS

const app = {
  // la liste des prénoms sera stockée ici
  resultat: [],

  form: document.getElementById('main-form'),
  resultsContainer: document.getElementById('results-container'),
  inputForbiddenLetters: document.getElementById('lettres-interdites'),
  inputMandatoryLetters: document.getElementById('lettres-obligatoires'),
  inputFirstNameLength: document.getElementById('longueur-prenom'),

  // pour convertir la string de lettres interdites en array
  convertString: (string) => {
    let finalString = string.toLowerCase();
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

  // trouver les bons prénoms
  findPrenom: (firstNameLength, forbiddenLetters, mandatoryLetters) => {
    app.resulat = []; //réinit le résultat
    console.log('reinit', app.resulat);

    for (let i = 0; i < prenoms.length; i++) {
      if (
        prenoms[i].fields.prenoms.length === firstNameLength &&
        app.notLetters(prenoms[i].fields.prenoms, forbiddenLetters) &&
        app.containsLetters(prenoms[i].fields.prenoms, mandatoryLetters)
      ) {
        app.resultat.push(prenoms[i].fields.prenoms);
      }
    }
    // on supprime les doublons
    let cleanResult = new Set(app.resultat);
    app.resultat = [...cleanResult];
    console.log(app.resultat);
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

    if (app.resultat.length <= 50 && app.resultat.length > 0) {
      for (i = 0; i < app.resultat.length; i++) {
        let result = document.createElement('div');
        result.classList.add('result');
        result.textContent = app.resultat[i];
        app.resultsContainer.appendChild(result);
      }
    } else if (app.resultat.length == 0) {
      console.log('pas de résultat');
    } else {
      let result = document.createElement('div');
      result.classList.add('result');
      result.textContent = 'Trop de résultats, affinez votre recherche';
      app.resultsContainer.appendChild(result);
    }
  },
};

app.init();
