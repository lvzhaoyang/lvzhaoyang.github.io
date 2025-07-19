function addPaper({
	image,
	title,
	authors,
	conference,
	arxivLink,
	projectLink,
	videoLink,
	codeLink,
	codeLabel = "Code",
	arxivLabel = null,
	awards = null
}) {
	const container = document.getElementById("papers-container") || document.body;
	const highlightedAuthors = authors.replace(/(zhaoyang lv)/gi, '<strong>$1</strong>');
	
	// Handle arxiv label
	let arxivText = arxivLabel || `arXiv ${arxivLink.split('/').pop()}`;
	
	const paperHTML = `
<div class="card mb-4 shadow-sm">
	<div class="row g-0 align-items-center">
		<div class="col-12 col-md-4 text-center p-3">
			<a href="${projectLink || '#'}" target="_blank" class="text-decoration-none">
				<img class="img-fluid rounded" src="${image}" alt="${title}" loading="lazy">
			</a>
		</div>
		<div class="col-12 col-md-8 p-3">
			<h4 class="fw-bold mb-2">${title}</h4>
			<p class="text-muted mb-2">${highlightedAuthors}</p>
			<p class="mb-2">${conference}, 
				<a href="${arxivLink}" target="_blank" class="text-decoration-none">
					${arxivText}
					<i class="ai ai-arxiv" style="color:red"></i>
				</a>
			</p>
			${awards ? `<p class="mb-2"><span class="badge bg-warning text-dark">🏆 ${awards}</span></p>` : ""}
			<div class="d-flex gap-3 flex-wrap">
				${projectLink ? `<a href="${projectLink}" target="_blank" class="btn btn-outline-primary btn-sm">Project Page <i class="fas fa-home"></i></a>` : ""}
				${videoLink ? `<a href="${videoLink}" target="_blank" class="btn btn-outline-danger btn-sm">Video <i class="fab fa-youtube"></i></a>` : ""}
				${codeLink ? `<a href="${codeLink}" target="_blank" class="btn btn-outline-dark btn-sm">${codeLabel} <i class="fab fa-github"></i></a>` : ""}
			</div>
		</div>
	</div>
</div>
<!-- <hr class="my-4"> -->
`;
	container.insertAdjacentHTML("beforeend", paperHTML);
}

function addProject({
	image,
	title,
	authors,
	description,
	codeLink,
	arxivLink,
	projectLink,
	videoLink
}) {
	const container = document.getElementById("projects-container") || document.body;
	const highlightedAuthors = authors.replace(/(zhaoyang lv)/gi, '<strong>$1</strong>');
	const paperHTML = `
<div class="card mb-4 shadow-sm">
	<div class="row g-0 align-items-center">
		<div class="col-12 col-md-4 text-center p-3">
			<a href="${projectLink || '#'}" target="_blank" class="text-decoration-none">
				<img class="img-fluid rounded" src="${image}" alt="${title}" loading="lazy">
			</a>
		</div>
		<div class="col-12 col-md-8 p-3">
			<h4 class="fw-bold mb-2">${title}</h4>
			<p class="text-muted mb-2">${highlightedAuthors}</p>
			${description ? `<p class="mb-2">${description}</p>` : ""}
			<div class="d-flex gap-3 flex-wrap">
				${projectLink ? `<a href="${projectLink}" target="_blank" class="btn btn-outline-primary btn-sm">Project Website <i class="fas fa-home"></i></a>` : ""}
				${videoLink ? `<a href="${videoLink}" target="_blank" class="btn btn-outline-danger btn-sm">Video <i class="fab fa-youtube"></i></a>` : ""}
				${codeLink ? `<a href="${codeLink}" target="_blank" class="btn btn-outline-dark btn-sm">Code <i class="fab fa-github"></i></a>` : ""}
				${arxivLink ? `<a href="${arxivLink}" target="_blank" class="btn btn-outline-secondary btn-sm">arXiv <i class="ai ai-arxiv"></i></a>` : ""}
			</div>
		</div>
	</div>
</div>
<!-- <hr class="my-4"> -->
`;
	container.insertAdjacentHTML("beforeend", paperHTML);
}

document.addEventListener('DOMContentLoaded', function() {
    publications.forEach(p => addPaper(p));
    projects.forEach(p => addProject(p));

    hljs.highlightAll();

    function setThemeIcon(isDark) {
        const iconDesktop = document.getElementById('theme-toggle-icon-desktop');
        const iconMobile = document.getElementById('theme-toggle-icon-mobile');
        if (iconDesktop) iconDesktop.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        if (iconMobile) iconMobile.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    function setThemeFromStorage() {
        const isDark = localStorage.getItem('theme') === 'dark';
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        setThemeIcon(isDark);
    }

    setThemeFromStorage();

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        setThemeIcon(isDark);
    }
    var btnDesktop = document.getElementById('theme-toggle-desktop');
    var btnMobile = document.getElementById('theme-toggle-mobile');
    if (btnDesktop) btnDesktop.addEventListener('click', toggleTheme);
    if (btnMobile) btnMobile.addEventListener('click', toggleTheme);
});