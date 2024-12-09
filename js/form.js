export function initForm(photos, renderThumbnails) {
  const uploadForm = document.querySelector('.img-upload__form');
  if (!uploadForm) {
    console.error('Форма загрузки не найдена');
    return;
  }

  const fileInput = uploadForm.querySelector('.img-upload__input');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const previewImage = uploadOverlay.querySelector('.img-upload__preview img');
  const closeButton = uploadOverlay.querySelector('.img-upload__cancel');

  function resetForm() {
    uploadForm.reset();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    fileInput.value = '';
    previewImage.src = '';
  }

  pristine.addValidator(
    descriptionInput,
    (value) => value.length <= 140,
    'Комментарий не должен превышать 140 символов.'
  );


  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      previewImage.src = imageUrl;
      uploadOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');

      previewImage.onload = () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  });

  closeButton.addEventListener('click', resetForm);

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newPhoto = {
      id: photos.length + 1,
      url: URL.createObjectURL(fileInput.files[0]),
      description: 'Новое фото',
      likes: 0,
      comments: []
    };

    photos.push(newPhoto);
    renderThumbnails([newPhoto]);

    resetForm();
  });
}
