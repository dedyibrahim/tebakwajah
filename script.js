const maleImages = [
  "Agung Herning Indradi Prajanto,S.H.,M.Hum.jpg",
  "Akhmad Fibriansyah Bagan,S.H.,MKn.jpg",
  "Anshar Amal,S.H.,M.Kn.jpg",
  "Dr.Bachrudin,S.H.,M.Kn.jpg",
  "Dr.Kaharudin Kamaru,S.H.,M.Kn.jpg",
  "Dr.Saharjo,,S.H.,M.Kn.,M.H.jpg",
  "Dr.Sri Wahyu Jatmikowati,S.H.,M.H.jpg",
  "Dr.Sudirman,S.H.,M.Kn.jpeg",
  "Emmanuel Mali, S.H., M.H.jpg",
  "H.Benizon,S.H.jpg",
  "H.Samsuri,S.H.,M.Kn.jpg",
  "Helmy,S.H.,M.Kn.jpg",
  "I Wayan Muntra.S.H.jpg",
  "Muhammad Taufik,S.H.,M.Kn.jpeg",
  "Novrial Bahrun,S.H.,M.Kn.jpg",
  "Sri Wahyu Sugeng,S.H.jpg",
  "Taufan Ladjantja,S.H.,M.Kn.jpg",
  "Wahyu Dwi Cahyono,S.H.,M.Kn.jpg",
  "Wedy Asmara.,,S.H.,Sp.N.jpg",
  "Zul April,S.H.jpg"
];

const femaleImages = [
  "Abigael Agnes Serworwora,S.H.jpeg",
  "Arlan,S.H.,M.Kn.jpg",
  "Dewantari Handayani,S.H.,MPA.jpg",
  "Dr.Christina Ella Yonatan,S.H.,M.Kn.jpg",
  "DR.Nurlinda Simanjorang,S.H.,Sp.N,M.Kn.jpg",
  "Ellies Daini,S.H.,M.Kn.jpg",
  "Leiga Afita Soelaiman.SH.,MH.jpg",
  "Maria Astuti.S.H.jpg",
  "Nila Rufaida,S.H.jpg",
  "Ratna Nelly Riyanty,S.H.Sp.N.,M.H.jpg",
  "Rosemerry Aref,S.H.,M.Kn.jpg",
  "Sartin Sartina,S.H.,M.Kn.jpg",
  "Siti Hikmah Nuraeni,S.H.jpg"
];
const allImages = [...maleImages, ...femaleImages];
let currentImage = 0;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function showLoading(show) {
  const loading = document.getElementById('loading');
  loading.style.display = show ? 'flex' : 'none';
}

function loadImage(index) {
  showLoading(true);
  const imageName = allImages[index];
  const imageElement = document.getElementById('faceImage');
  const blurOverlay = document.getElementById('blurOverlay');
  const optionsContainer = document.getElementById('optionsContainer');

  imageElement.onload = () => showLoading(false);
  imageElement.src = `images/${imageName}`;
  blurOverlay.style.display = 'block';
  optionsContainer.innerHTML = '';

  const correctName = imageName.replace(/\.(jpg|jpeg|png)/i, '');
  const genderList = femaleImages.includes(imageName) ? femaleImages : maleImages;

  let options = shuffle(genderList)
    .filter(name => name !== imageName)
    .slice(0, 3)
    .map(name => name.replace(/\.(jpg|jpeg|png)/i, ''));

  options.push(correctName);
  options = shuffle(options);

  options.forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name;

    btn.onclick = () => {
      blurOverlay.style.display = 'none';
      const buttons = optionsContainer.querySelectorAll('button');

      buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctName) {
          button.style.backgroundColor = '#7fff7f';
        }
      });

      if (name === correctName) {
        btn.style.backgroundColor = '#7fff7f';
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        btn.style.backgroundColor = '#ff7f7f';
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('shake');
        setTimeout(() => {
          gameContainer.classList.remove('shake');
        }, 500);
      }
    };

    optionsContainer.appendChild(btn);
  });
}

document.getElementById('nextBtn').addEventListener('click', () => {
  currentImage = (currentImage + 1) % allImages.length;
  loadImage(currentImage);
});

window.onload = () => loadImage(currentImage);