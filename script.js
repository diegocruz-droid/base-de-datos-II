document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const loginBtn = document.getElementById('login-btn');
    const adminPanel = document.getElementById('admin-panel');
    const foldersContainer = document.getElementById('folders-container');
    const userSettings = document.getElementById('user-settings');
    const saveUserBtn = document.getElementById('save-user-btn');

    // Usuario y contraseña iniciales
    let credentials = { username: "admin", password: "1234" };

    // 📂 Solo Semana 1
    const folderData = [
        {
            name: "Semana 1",
            content: "Material introductorio. Contiene la presentación del curso.",
            files: [
                {
                    name: "Presentation.pdf",
                    url: "https://raw.githubusercontent.com/diegocruz-droid/base-de-datos-II/11bd0bd11e0adc199fa5dd43423e91659c658be9/semana1/Presentation.pdf"
                }
            ]
        }
    ];

    // 🔧 Crear carpeta
    const createFolder = (folderInfo) => {
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

    // 🧱 Crear carpeta de Semana 1
    folderData.forEach(folderInfo => {
        const folder = createFolder(folderInfo);
        foldersContainer.appendChild(folder);
    });

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
                        .map(file => `
                            <p>📄 
                                <a href="#" class="preview-link" data-url="${file.url}" data-name="${file.name}">
                                    ${file.name}
                                </a>
                            </p>
                        `)
                        .join('');
                } else {
                    fileList.innerHTML = "<p>No hay archivos disponibles.</p>";
                }
                fileList.style.display = 'block';
            } else {
                fileList.style.display = 'none';
            }
        }

        // Mostrar vista previa del archivo
        if (event.target.classList.contains('preview-link')) {
            event.preventDefault();
            const url = event.target.getAttribute('data-url');
            const name = event.target.getAttribute('data-name');
            mostrarVistaPrevia(url, name);
        }
    });

    // 🔍 Crear contenedor para vista previa
    const previewContainer = document.createElement('section');
    previewContainer.id = 'preview-container';
    previewContainer.style = `
        margin-top: 30px;
        background: rgba(255,255,255,0.95);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;
    foldersContainer.insertAdjacentElement('afterend', previewContainer);

    // 🧩 Mostrar vista previa
    function mostrarVistaPrevia(url, nombre) {
        previewContainer.innerHTML = `
            <h2>${nombre}</h2>
            <iframe 
                src="${url}" 
                width="100%" 
                height="600px" 
                style="border:none; border-radius:10px;">
            </iframe>
            <div style="text-align:center; margin-top:10px;">
                <a href="${url}" target="_blank" class="download-btn" style="text-decoration:none; background:#007BFF; color:white; padding:8px 15px; border-radius:6px;">Abrir en nueva pestaña</a>
            </div>
        `;
        previewContainer.scrollIntoView({ behavior: 'smooth' });
    }
});



