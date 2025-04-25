module.exports = {

    getParams(req, params) {
        return Object.assign({}, {
            date:{},
            menus: req.menus,
            user: req.session.user,
        })

    },

    getMenus(req) {
        let menus = [
            {
                text: "Tela Inicial",
                href: "/admin/",
                icon: "home",
                active: false
            },
            {
                text: "Reservas",
                href: "/admin/reservations",
                icon: "calendar-check-o",
                active: false
            },
            {
                text: "Usuários",
                href: "/admin/users",
                icon: "users",
                active: false
            },
            {
                text: "E-mails",
                href: "/admin/emails",
                icon: "envelope",
                active: false
            },
            {
                text: "Cardápios",
                href: "/admin/menus",
                icon: "cutlery",
                active: false
            },
            {
                text: "Contatos",
                href: "/admin/contacts",
                icon: "comments",
                active: false
            },
            
        ]

        return menus.map((menu) => {
            
            if (menu.href === `/admin${req.url}`) menu.active = true;
        });

        return menus;
    }
}