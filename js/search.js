document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
});

function showAddPhotoForm() {
    document.getElementById('addPhotoForm').style.display = 'block';
}

function hideAddPhotoForm() {
    document.getElementById('addPhotoForm').style.display = 'none';
}

function addPhoto() {
    const photoUrl = document.getElementById('photoUrl').value;
    const photoTags = document.getElementById('photoTags').value.split(',').map(tag => tag.trim());

    if (photoUrl && photoTags.length > 0) {
        const photoData = {
            url: photoUrl,
            tags: photoTags
        };

        savePhoto(photoData);
        addPhotoToGallery(photoData);
        hideAddPhotoForm();
        document.getElementById('photoUrl').value = '';
        document.getElementById('photoTags').value = '';
    }
}

function savePhoto(photoData) {
    let photos = JSON.parse(localStorage.getItem('photos')) || [];
    photos.push(photoData);
    localStorage.setItem('photos', JSON.stringify(photos));
}

function loadPhotos() {
    const photos = JSON.parse(localStorage.getItem('photos')) || [];
    photos.forEach(photoData => {
        addPhotoToGallery(photoData);
    });
}

function addPhotoToGallery(photoData) {
    const newPhoto = document.createElement('div');
    newPhoto.className = 'img';
    newPhoto.innerHTML = `<img src="${photoData.url}" alt="${photoData.tags.join(', ')}" />`;

    const imgContainer = document.getElementById('imgContainer');
    imgContainer.appendChild(newPhoto);

    newPhoto.querySelector('img').addEventListener('click', () => {
        const popUp = document.querySelector('.pop-up');
        const popUpImg = popUp.querySelector('img');
        popUpImg.src = newPhoto.querySelector('img').src;
        popUp.style.display = 'block';
    });
}

function searchPhotos() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const photos = JSON.parse(localStorage.getItem('photos')) || [];
    const imgContainer = document.getElementById('imgContainer');
    imgContainer.innerHTML = '';

    const filteredPhotos = photos.filter(photo => 
        photo.tags.some(tag => tag.toLowerCase().includes(query))
    );

    filteredPhotos.forEach(photoData => {
        addPhotoToGallery(photoData);
    });
}

// Закриття великого зображення
document.querySelector('.pop-up span').addEventListener('click', () => {
    document.querySelector('.pop-up').style.display = 'none';
});

// Додавання функціоналу для відображення великого зображення для існуючих зображень
document.querySelectorAll('.img img').forEach(img => {
    img.addEventListener('click', () => {
        const popUp = document.querySelector('.pop-up');
        const popUpImg = popUp.querySelector('img');
        popUpImg.src = img.src;
        popUp.style.display = 'block';
    });
});
