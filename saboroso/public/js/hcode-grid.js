class HcodeGrid {
    constructor(configs) {

        configs.listeners = Object.assign({
            afterUpdateClick: (e) => {
                $('#modal-update').modal('open');
            },
            afterDeleteClick: (e) => {
                window.location.reload();
            },
            afterFormCreate: (e) => {
                window.location.reload();
            }, 
            afterFormUpdate: (e) => {
                window.location.reload();
            },
            afterFormCreateError: (e) => {
                alert('Erro ao salvar');
            },
            afterFormUpdateError: (e) => {
                alert('Erro ao salvar');
            }

        }, configs.listeners)

        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad: (form, name, data) => {
                let input = form.querySelector(`[name="${name}"]`);
                if (input)input.value = data[value];
            },
        }, configs);
        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initForms();
        this.initButtons();
    }

    getTrData(e) {
        let tr = e.path.find(el => {
            return (el.tagName.toUpperCase() === 'TR')
        })

        return JSON.parse(tr.dataset.row);


    }

    fireEvent(name, args) {
        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);
    }

    initForms() {

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json => {
            this.fireEvent('afterFormCreate');
        }).catch(err => {
            this.fireEvent('afterFormCreateError');
        });

        this.formUpdate = document.querySelector(this.options.formUpdate);
        this.formUpdate.save().then(json => {
            this.fireEvent('afterFormUpdate');
        }).catch(err => {
            this.fireEvent('afterFormCreateError');

        });

    }

    btnDeleteClick(e) {

        this.fireEvent('beforeDeleteClick');

        let data = this.getTrData(e);

        if (confirm(eval('`' + this.options.deleteMsg + '`') )) {

            fetch(eval('`' + this.options.deleteUrl + '`'), {
                method: "DELETE"
            })
           .then(response => response.json())
           .then(json => {
                this.fireEvent('afterDeleteClick');
            })
        }
    }

    btnUpdateClick() {

        this.fireEvent('beforeUpdateClick', [e]);

        let data = this.getTrData(e);

        for (let name in data) {
            this.options.onUpdateLoad(this.formUpdate, name, data);
        }

        this.fireEvent('afterUpdateClick', [e]);

    }
    
    initButtons () {

        this.rows.forEach(row => {
            [...row.querySelectorAll('.btn')].forEach(btn => {
                btn.addEventListener('click', e => {
                    if (e.target.classList.contains(this.options.btnUpdate)) {
                        this.btnUpdateClick();
                    } else if (e.target.classList.contains(this.options.btnDelete)) {
                        this.btnDeleteClick();
                    } else {
                        this.fireEvent('buttonClick', [e.target, this.getTrData(e), e])
                    }
                    
                })
                
            });
        })
    }
}