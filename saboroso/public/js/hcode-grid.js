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
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete',
            onUpdateLoad: (form, name, data) => {
                let input = form.querySelector(`[name="${name}"]`);
                if (input)input.value = data[value];
            },
        }, configs);

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
    
    initButtons () {
    
        document.querySelectorAll(this.btnUpdate).forEach(btn => {
            btn.addEventListener('click', e => {

                this.fireEvent('beforeUpdateClick', [e]);
                let data = this.getTrData(e);

                
                for (let name in data) {
                    let input = this.formUpdate.querySelector(`[name="${name}"]`);

                    switch (name) {
                    
                        case 'date':
                            if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
                            break;

                        default:
                            if (input) input.value = data[name];

                    }
                }
                this.fireEvent('afterUpdateClick', (e) => {
                    $('#modal-update').modal('open');

                });
            });
        });
        document.querySelectorAll(this.btnDelete).forEach(btn => {
            btn.addEventListener('click', e => { 

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
            });
        });
    }
}