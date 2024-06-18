export default function ValidateForm(event) {
    event.preventDefault() // Prevent default form submission


    const myForm = document.getElementById("error")
    const imageInput = document.getElementById('imageInput')
    const imageFile = imageInput.files[0]

    if (!imageFile) {
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Plase select an image</span></div>'
        // alert('Please select an image.');
        return false
    }

    if (imageFile.size > 1024 * 1024) { // 1MB
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Image size exceeds the limit (1 MB).</span></div>'
        return false
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png']
    if (!allowedMimeTypes.includes(imageFile.type)) {
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Invalid image format. Only JPEG or PNG are allowed.</span></div>'
        return false
    }
    const inputNameProduct = document.getElementById('nameProduct')
    const valueNameProduct = inputNameProduct.value

    if (!valueNameProduct) {
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Please enter a name book</span></div>'
        return false
    } else if (valueNameProduct.length > 50) {
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Name book max 50 character</span></div>'
        inputNameProduct.value = valueNameProduct.slice(0, 50);
        return false
    }

    const inputAuthor = document.getElementById('author')
    const valueAuthor = inputAuthor.value

    if (!valueAuthor) {
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Please enter a name author</span></div>'
        return false
    } else if (valueAuthor.length > 50) {
        myForm.innerHTML = '<div role="alert" class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Name book max 50 character</span></div>'
        inputAuthor.value = valueAuthor.slice(0, 50);
        return false
    }

    return true
}