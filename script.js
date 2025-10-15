document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const loginBtn = document.getElementById('login-btn');
    const adminPanel = document.getElementById('admin-panel');
    const foldersContainer = document.getElementById('folders-container');
    const userSettings = document.getElementById('user-settings');
    const saveUserBtn = document.getElementById('save-user-btn');

    // Usuario y contraseña iniciales
    let credentials = { username: "admin", password: "1234" };

    // 📂 Contenido de las carpetas (16 semanas)
    const folderData = [
        {
            name: "Semana 1",
            content: "Material introductorio.",
            files: [
                {
                    name: "Documento Semana 1.pdf",
                    url: "https://github.com/diegocruz-droid/base-de-datos-II/blob/main/semana1/Presentation.pdf"
                }
            ]
        },
        {
            name: "Semana 2",
            content: "Contenido de la semana 2.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 3",
            content: "Contenido de la semana 3.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 4",
            content: "Contenido de la semana 4.",
            files: [
                {
                    name: "diseño de arquitectura de base de datos",
                    url: "https://github.com/diegocruz-droid/base-de-datos-II/blob/main/semana4/Dise%C3%B1o%20de%20Arquitectura%20de%20Base%20de%20Datos.pdf"
                }
            ]
        },
        {
            name: "Semana 5",
            content: "Contenido de la semana 5.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 6",
            content: "Contenido de la semana 6.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 7",
            content: "Contenido de la semana 7.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 8",
            content: "Contenido de la semana 8.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 9",
            content: "Contenido de la semana 9.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 10",
            content: "Contenido de la semana 10.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 11",
            content: "Contenido de la semana 11.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 12",
            content: "Contenido de la semana 12.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 13",
            content: "Contenido de la semana 13.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 14",
            content: "Contenido de la semana 14.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 15",
            content: "Contenido de la semana 15.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        },
        {
            name: "Semana 16",
            content: "Contenido de la semana 16.",
            files: [
                {
                    name: "",
                    url: "AQUI VA EL ENLACE"
                }
            ]
        }
    ];

    // 🔧 Crear carpeta
    const createFolder = (folderNumber) => {
        const folderInfo = folderData[folderNumber - 1] || {
            name: `Carpeta ${folderNumber}`,
            content: "Sin contenido disponible.",
            files: []
        };

        const folder = document.createElement('div');
        folder.classList.add('folder');
        folder.innerHTML = `
            <h3>${folderInfo.name}</h3>
            <p>${folderInfo.content}</p>
            <button class="view-btn">Ver contenido</button>
            <div class="file-list" style="display:none;"></div>
        `;
        return folder;
    };

    // 🧱 Crear 16 carpetas
    for (let i = 1; i <= 16; i++) {
        const folder = createFolder(i);
        foldersContainer.appendChild(folder);
    }

    // 🔐 Login
    loginBtn.addEventListener('click', () => {
        const user = prompt('Ingresa tu nombre de usuario:');
        const password = prompt('Ingresa tu contraseña:');

        if (user === credentials.username && password === credentials.password) {
            adminPanel.style.display = 'block';
            userSettings.style.display = 'block';
            loginBtn.style.display = 'none';

            document.getElementById('username').value = credentials.username;
            document.getElementById('password').value = credentials.password;
        } else {
            alert('❌ Credenciales incorrectas');
        }
    });

    // 💾 Guardar usuario y contraseña
    saveUserBtn.addEventListener('click', () => {
        credentials.username = document.getElementById('username').value;
        credentials.password = document.getElementById('password').value;
        alert("✅ Usuario y contraseña actualizados");
    });

    // 👁️ Ver contenido
    foldersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-btn')) {
            const folder = event.target.closest('.folder');
            const index = Array.from(foldersContainer.children).indexOf(folder);
            const folderInfo = folderData[index];
            const fileList = folder.querySelector('.file-list');

            if (fileList.style.display === 'none') {
                if (folderInfo && folderInfo.files.length > 0) {
                    fileList.innerHTML = folderInfo.files
                        .map(file => {
                            const finalURL = transformarURL(file.url);
                            return `<p>📄 <a href="${finalURL}" target="_blank">${file.name}</a></p>`;
                        })
                        .join('');
                } else {
                    fileList.innerHTML = "<p>No hay archivos disponibles.</p>";
                }
                fileList.style.display = 'block';
            } else {
                fileList.style.display = 'none';
            }
        }
    });

    // 🔁 Transformar enlaces de GitHub (de blob a raw)
    function transformarURL(url) {
        if (url.includes("github.com") && url.includes("/blob/")) {
            return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
        }
        return url;
    }
});



