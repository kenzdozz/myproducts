const baseUrl = 'https://productz.herokuapp.com/api/v1';

const $ = (selector, all = false) => {
    if (all) return document.querySelectorAll(selector);
    return document.querySelector(selector) || {};
};

const createElement = (type, attributes) => {
    var element = document.createElement(type);
    for (var key in attributes) {
        if (key == "class") {
            element.classList.add(...attributes[key]);
        } else if (key == 'innerHTML') {
            element[key] = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    return element;
}

const fetchCall = async (url, method = 'GET', data, isFormData = false) => {
    const config = {
        method,
        body: isFormData ? data : JSON.stringify(data)
    };
    config.headers = {}
    if (!isFormData) config.headers['Content-Type'] = 'application/json; charset=utf-8';
    try {
        const resData = await fetch(`${baseUrl}${url}`, config);
        const response = await resData.json();
        return response;
    } catch (error) {
        console.log(error)
        return {};
    }
}

class Loading {
    constructor(element, classNames = '') {
        this.element = element;
        this.element.classList.add('isloading');
        const lClass = ['loader'];
        if (classNames.split(' ').includes('big')) lClass.push('big');
        this.loader = createElement('span', {
            class: lClass,
            innerHTML: `
        <svg class="${classNames}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="10" width="4" height="10" class="svg-rect" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="8" y="10" width="4" height="10" class="svg-rect" fill="#333"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="16" y="10" width="4" height="10" class="svg-rect" fill="#333"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>`
        });
        return this;
    }
    start() {
        this.element.appendChild(this.loader);
        this.element.classList.add('progress');
    }
    stop() {
        this.element.removeChild(this.loader);
        this.element.classList.remove('progress');
        this.element.classList.remove('isloading');
    }
}

const emptyForm = form => {
    for (const element of form.elements) {
        element.value = '';
    }
    const imageHolder = form.querySelector('.upload-image');
    const placeholderUrl = './images/upload.webp';
    if (imageHolder) {
        imageHolder.querySelector('img.upload').setAttribute('src', placeholderUrl);
        imageHolder.classList.remove('uploaded');
    }
}

$('.modal-close', true).forEach(item => {
    item.addEventListener('click', () => {
        $('.modal', true).forEach(modal => {
            modal.classList.remove('show');
            const mForm = modal.querySelector('form');
            if (mForm) {
                emptyForm(mForm);
                mForm.querySelectorAll('.form-error').forEach(elem => elem.innerHTML = '');
                delete mForm.dataset.id;
            }
        });
    })
});

$('img.upload', true).forEach(uploder => {
    uploder.onclick = event => {
        const inputFile = uploder.closest('.input-group').querySelector('input[type=file]');
        if (inputFile) inputFile.click();
    }
});

$('.upload-image .remove', true).forEach(removeImg => {
    removeImg.onclick = event => {
        const inpGrp = removeImg.closest('.input-group');
        const placeholderUrl = './images/upload.webp';
        inpGrp.querySelector('.upload-image').classList.remove('uploaded');
        inpGrp.querySelector('img.upload').setAttribute('src', placeholderUrl);
        inpGrp.querySelector('input[type=file]').value = null;
    }
});

const formInputListener = form => {
    for (let element of form.elements) {
        element.oninput = event => {
            let genErrorSpan = form.querySelector('.form-error.gen-error');
            let errorSpan = element.closest('.input-group').querySelector('.form-error');
            if (genErrorSpan) genErrorSpan.innerHTML = '';
            if (errorSpan) errorSpan.innerHTML = '';
        }
    }
}

$('input[type=file]', true).forEach(inputFile => {
    inputFile.onchange = event => {
        const imgHolder = inputFile.closest('.input-group').querySelector('img.upload');
        if (!imgHolder || !inputFile.files || !inputFile.files[0]) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            imgHolder.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(inputFile.files[0]);
        inputFile.closest('.input-group').querySelector('.upload-image').classList.add('uploaded');
    }
});

const getFormData = form => {
    const formData = new FormData();
    for (const element of form.elements) {
        const name = element.getAttribute('name');
        const elem = form[name];
        if (elem && elem.value && !formData.has(name)) formData.append(name, elem.value);
    }
    return formData;
}

const triggerModal = modalId => {
    const modal = $('#' + modalId);
    modal.classList.add('show');
    modal.querySelector('.modal-content').classList.add('slide-in');
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('slide-in');
    }, 100);
}

const setEmptyRow = (colSpan) => {
    const table = $('table tbody');
    const row = document.createElement('tr');
    row.id = 'emptyRow';
    const data = document.createElement('td');
    data.colSpan = colSpan;
    data.innerHTML = 'No records found.';
    row.append(data);
    if(table) table.append(row);
}

const handleFieldErrors = (form, response) => {
    try {
        if (response.fields) for (const field in response.fields) {
            const errorSpan = form[field].closest('.input-group').querySelector('.form-error');
            errorSpan.innerHTML = response.fields[field];
        }
        const genError = form.querySelector('.gen-error');
        if (genError) genError.innerHTML = response.error;
    } catch (err) {console.log(err)}
}

const populateRecord = (item, action = '') => {
    const record = {
        id: item.id,
        name: item.name,
        price: item.price,
    }
    const table = document.querySelector('table tbody');
    let row;
    if (action === 'edit') {
        row = document.querySelector(`#item-${item.id}`);
        row.innerHTML = '';
    } else {
        row = document.createElement('tr');
        row.id = `item-${item.id}`;
    }
    row.dataset.id = item.id;

    let editBtn = document.createElement('a');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.href = 'javascript:;';
    editBtn.onclick = editModal(item);

    let deleteBtn = document.createElement('a');
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.href = 'javascript:;';
    deleteBtn.onclick = deleteModal(item);

    let data = document.createElement('td');
    data.append(editBtn);
    data.append(deleteBtn);
    row.append(data)

    for (let prop in record) {
        const data = document.createElement('td');
        if (prop === 'price') {
            data.innerHTML = `$ ${record.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`
        } else {
            data.innerHTML = record[prop];
        }
        row.append(data)
    }
    const vData = createElement('td');
    const viewBtn = createElement('a', {
        class: ['btn', 'btn-green', 'btn-sm'],
        innerHTML: 'View',
        href: 'javascript:;'
    });
    viewBtn.onclick = viewModal(item);
    vData.append(viewBtn);
    row.append(vData);
    document.querySelector('.empty').innerHTML = '';

    if (action === 'edit') return false;
    if (action === 'prepend') return table.prepend(row);
    table.append(row);
};

let products = [];
window.onload = async e => {
    const loader = new Loading($('.load'), 'dark big');
    loader.start();
    const response = await fetchCall('/products');
    products = response.data;
    if (!products || !products.length) setEmptyRow(5);
    loader.stop();
    products.forEach(item => {
        populateRecord(item);
    });
}

$('#manageProduct form').onsubmit = async function (event) {
    formInputListener(this);
    const isEdit = this.dataset.id ? true : false;
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    event.preventDefault();
    const formData = getFormData(this);
    const fileInput = this.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0])
        formData.append('image', fileInput.files[0]);
    const url = isEdit ? `/products/${this.dataset.id}` : '/products';
    const response = await fetchCall(url, isEdit ? 'PATCH' : 'POST', formData, true);
    loader.stop();
    if (!response.status || response.status >= 400) return handleFieldErrors(this, response);
    if (isEdit) {
        const index = products.indexOf(products.find(item => item.id = this.dataset.id));
        products[index] = response.data;
    } else products.unshift(response.data);
    populateRecord(response.data, isEdit ? 'edit' : 'prepend');
    $('#manageProduct .modal-close').click()
    if (!isEdit) previewProduct(response.data);
}

const editModal = (product) => () => {
    triggerModal('manageProduct');
    const mProduct = $('#manageProduct');
    mProduct.querySelector('.modal-title').innerHTML = 'Edit a Product';
    const mpForm = mProduct.querySelector('form');
    mpForm.dataset.id = product.id;
    mpForm['name'].value = product.name;
    mpForm['description'].value = product.description;
    mpForm['price'].value = product.price;
    mpForm['category'].value = product.category;
    mpForm['color'].value = product.color;
    mpForm.querySelector('.upload-image').classList.add('uploaded');
    mpForm.querySelector('.upload-image img.upload').setAttribute('src', `.${product.image}`);
}

const deleteProduct = async (button, product) => {
    const loader = new Loading(button, 'sm');
    loader.start();
    const response = await fetchCall(`/products/${product.id}`, 'DELETE');
    loader.stop();
    if (response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error;
        return false;
    }
    products.pop(product);
    if (!products.length) setEmptyRow();
    $(`#item-${product.id}`).remove();
    $('#dialogModal .modal-close').click()
}

const deleteModal = (product) => () => {
    triggerModal('dialogModal');
    $('#dialogModal .modal-title').innerHTML = `Delete ${product.name}?`;
    $('#dialogModal .alert.error').classList.remove('show');
    $('#dialogModal button.delete').onclick = (e) => deleteProduct( e.target, product);
}

const viewModal = (product) => () => {
    previewProduct(product);
}

const previewProduct = (product) => {
    triggerModal('viewProduct');
    const pModal = $('#viewProduct');
    pModal.querySelector('img').src = `.${product.image}`;
    pModal.querySelector('.name').innerHTML = product.name;
    pModal.querySelector('.category').innerHTML = product.category;
    pModal.querySelector('.description').innerHTML = product.description;
    pModal.querySelector('.color').innerHTML = `Color: ${product.color}`;
    pModal.querySelector('.price').innerHTML = `$ ${product.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal)
        $('#' + this.dataset.modal).querySelector('.modal-title').innerHTML = 'Add a Product';
    })
});
