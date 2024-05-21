import '../../styles/menu.css';

const Menu = () => {

    let page = window.location.pathname.replace("/", "");

    console.log(page);

    return (
        <div id="menu-container">
            <ul id="menu">
                <li id={page === "" ? "active" : ""}><a href="/">Accueil</a></li>
                <li id={page === "etudiants" ? "active" : ""}><a href="/etudiants">Etudiants</a></li>
                <li id={page === "enseignants" ? "active" : ""}><a href="/enseignants">Enseignants</a></li>
                <li id={page === "matiere" ? "active" : ""}><a href="/matiere">Matière</a></li>
                <li id={page === "note" ? "active" : ""}><a href="/note">Note</a></li>
            </ul>
        </div>
    );
}

export default Menu;