const CONTAINER = document.querySelector('.container');

const MAIN = document.querySelector('.main');
const CHOOSER = document.querySelector('.chooser');

const CONTENT = document.querySelector('.box__content');
const TEXTAREA = document.querySelector('.form-edit__textarea');
const PICKER = document.querySelector('.color-picker');

const F_EDIT = document.forms.formEdit;
const F_STYLE = document.forms.formStyle;
const F_CHOOSER = document.forms.formChooser;
const F_TABLE = document.forms.formTable;
const F_LIST = document.forms.formList;


TEXTAREA.value = CONTENT.innerHTML;

CONTAINER.addEventListener('click', function (event) {
    // Button [edit]
    if (event.target.innerHTML == 'edit') {
        F_STYLE.classList.add('hidden');

        F_EDIT.classList.toggle('hidden');
    }

    // Button [style]
    if (event.target.innerHTML == 'style') {
        F_EDIT.classList.add('hidden');

        F_STYLE.classList.toggle('hidden');

        // Font Family
        F_STYLE.formStyleSelect.addEventListener('change', (event) => {
            CONTENT.style.fontFamily = event.target.value;
        });
    }

    // Color picker
    else if (event.target.name === 'formStyleBtn') {
        PICKER.classList.toggle('hidden');

        if (event.target.innerHTML == 'Color of Text') {
            PICKER.classList.add('textColor');
            PICKER.classList.remove('bkColor');
        } else if (event.target.innerHTML == 'Background color') {
            PICKER.classList.add('bkColor');
            PICKER.classList.remove('textColor');
        }
    } else if (event.target.classList.contains('color-picker__item')) {
        // Set color
        if (PICKER.classList.contains('bkColor')) {
            CONTENT.style.backgroundColor = event.target.style.backgroundColor;
            PICKER.classList.add('hidden');
        }

        // Set backgroung-color
        else {
            CONTENT.style.color = event.target.style.backgroundColor;
            PICKER.classList.add('hidden');
        }
    }

    // Font Size
    else if (event.target.name == 'formStyleRadio') {
        CONTENT.style.fontSize = event.target.value;
    }

    // Style text
    else if (event.target.name == 'formStyleCheckbox') {
        if (event.target.value == 'bold') {
            if (event.target.checked) {
                CONTENT.style.fontWeight = 'bold';
            } else {
                CONTENT.style.fontWeight = '';
            }
        } else if (event.target.value == 'cursive') {
            if (event.target.checked) {
                CONTENT.style.fontStyle = 'italic';
            } else {
                CONTENT.style.fontStyle = '';
            }
        }
    }

    // Button [add]
    if (event.target.innerHTML == 'add') {
        MAIN.classList.add('hidden');
        CHOOSER.classList.remove('hidden');
    }
    // 
    else if (event.target.name == 'boxChooserRadio') {
        if (event.target.value == 'table') {
            F_LIST.classList.add('hidden');
            F_TABLE.classList.remove('hidden');
        } else if (event.target.value == 'list') {
            F_TABLE.classList.add('hidden');
            F_LIST.classList.remove('hidden');
        }
    } else if (event.target.innerHTML == 'Create table') {

        let crtTable = document.createElement('table');

        for (let i = 0; i < F_TABLE.countTr.value; i++) {

            let crtTr = document.createElement('tr');

            for (let j = 0; j < F_TABLE.countTd.value; j++) {

                let crtTd = document.createElement('td');

                crtTd.setAttribute('style', `width: ${F_TABLE.widthTd.value}px; height: ${F_TABLE.heigthTd.value}px; border: ${F_TABLE.widthBorder.value}px ${F_TABLE.typeBorder.value} ${F_TABLE.colorBorder.value};`);

                crtTr.append(crtTd);
            }
            crtTable.append(crtTr);
        }

        TEXTAREA.value += crtTable.outerHTML;
        F_LIST.classList.add('hidden');
        F_TABLE.classList.add('hidden');
        CHOOSER.classList.add('hidden');

        for (let i = 0; i < F_TABLE.elements.length - 3; i++) {
            F_TABLE.elements[i].value = '';
        }

        for (let i = 0; i < F_CHOOSER.length; i++) {
            F_CHOOSER[i].checked = false;
        }

        MAIN.classList.remove('hidden');
    } else if (event.target.innerHTML == 'Create list') {
        let crtList = document.createElement('ul');
        crtList.setAttribute('style', `list-style-type: ${F_LIST.typeMarks.value};`)
        for (let i = 0; i < F_LIST.countLi.value; i++) {
            let crtLi = document.createElement('li');
            crtList.append(crtLi);
        }


        TEXTAREA.value += crtList.outerHTML;

        F_LIST.classList.add('hidden');
        F_TABLE.classList.add('hidden');
        CHOOSER.classList.add('hidden');

        for (let i = 0; i < F_CHOOSER.length; i++) {
            F_CHOOSER[i].checked = false;
        }

        MAIN.classList.remove('hidden');
    }

    // Button [save]
    if (event.target.innerHTML == 'save') {
        CONTENT.innerHTML = TEXTAREA.value;

        F_EDIT.classList.add('hidden');
    }
});