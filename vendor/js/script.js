const hostname = "parrot"; /*Default hostname*/
let username = "santeri"; /*Default username*/

const terminal = document.getElementById("terminal"); /*Terminal content*/
const title = document.getElementById("title"); /*Terminal Window Title*/
const win = document.getElementById("window"); /*Terminal Window*/
const header = document.getElementById("header"); /*header of terminal window*/
let isDragging = false; /*Boolean which determines if dragging window or not*/
let offsetX = 0, offsetY = 0; /*X And Y offset*/
const promptText = () => `${username}@${hostname}:~$ `; /*Terminal prompt string*/
const setTitle = () => title.textContent = `${username}@${hostname}`; /*Update terminal title*/
setTitle(); /*Set Default title on run*/

/*Ability to drag the terminal window around the site*/
header.addEventListener("mousedown", e => { /*Mouse down and activate dragging*/
  isDragging = true;
  offsetX = e.clientX - win.offsetLeft;
  offsetY = e.clientY - win.offsetTop;
});

document.addEventListener("mousemove", e => { /*Dragging logic based on mouse movement*/
  if(!isDragging) return;
  win.style.left = (e.clientX - offsetX) + "px";
  win.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => /*Release window when mouse up*/
{
     isDragging = false; 
}); 


function print(text,){ /*Print function for terminal*/
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  terminal.appendChild(line);
}

function loadPrompt(){ /*Function that creates a new prompt*/
  const line = document.createElement("div"); 
  line.className = "line";

  const p = document.createElement("span");
  p.className = "prompt";
  p.textContent = promptText(); /*Get current prompt*/

  const input = document.createElement("input"); /*Input element for commands*/
  line.append(p,input);
  terminal.appendChild(line); /*Add line to terminal*/

  input.focus(); /*Autofocus on prompt*/

  input.addEventListener("keydown", e => {
    if(e.key !== "Enter") return;
    input.disabled = true;
    run(input.value.trim());
    terminal.scrollTop = terminal.scrollHeight;
    loadPrompt(); /*After command ran succesfully create new prompt*/
  });
}


function run(cmd){ /*Terminal command logic*/
  if(!cmd) return;  /*If no command, do nothing*/
  const [cmds,name] = cmd.split(" "); /*Split command for arguments, for commands like "su"*/

  switch(cmds){
    case "help":/*Display all available commands and their descriptions*/
        terminal.innerHTML ="";
        print("Here you will see an list of available commands:");
        print("\nabout:Displays information about me.\nclear: Clears the terminal.\nwhoami: Prints the active username.\nsu: Switch between users.\nneofetch: Displays information about system.\n");
        print("skills: Displays my skills.\nprojects: Shows my projects.");
        print("achievements: Displays my achievements.\nsocials: Displays my socials.")
    break;
    case "clear":/*Clear the terminal*/
         terminal.innerHTML="";
    break;
    case "about": /*Personal information*/
        terminal.innerHTML="";
        print("I am a 17-year-old developer and cybersecurity enthusiast, and while most people my age are just starting out,\nI’ve been around computers my entire life, also already reached the top 2% global rank on TryHackMe.\nOutperforming hundreds of thousands of users in cybersecurity challenges isn't just a hobby for me.\nIt’s proof that I have the persistence and the skills to solve problems that most find impossible.");
        print("My technical foundation is built on solid programming with C# and C++,\ncombined with the ability to build high-performance web applications using React and Next.js.\nI move fluently between Linux and Windows environments.")  
        print("I’m not just here to learn; I’m here to build secure, top-tier software and push the limits of what’s possible.")  
        print("- Santeri Salonen")
    break;
    case "whoami": /*Print username*/
         print(username);
    break;
    case "socials": /*Print socials*/
        print("TryHackMe:session1337\nGitHub:dmtr-1337")
        break;
    case "achievements": /*Print achievements*/
        print("TryHackMe Junior Pentester Certificate");
        print("TryHackMe Global ranking of top 2%");
    case "su": /*Switch username*/
    if(name)
    {
        username=name;
        setTitle(); /*Update username in terminal title*/
        print(`switched to user ${username}`);
    }
    break;
    case "neofetch": /*Ascii art from actual neofetch*/
         terminal.innerHTML="";
        print("        .--.               " +  "parrot@" + username);
        print("       |o_o |              ----------------");
        print("       |:_/ |               OS: Parrot GNU/Linux x86_64");
        print("      //   \\ \\              Host: DMTR's Portfolio");
        print("     (|     | )             Kernel: 7.0-parrot-amd64");
        print("    /'\\_   _/`\\             Uptime: 67 hours, 67 mins");
        print("    \\___)=(___/             Packages: 1000 (dpkg)");
        print("                            Shell: bash");
        print("                            Resolution: 1920x1080");
        print("                            Memory: 1."+ Math.floor(Math.random() * 9)+ "GiB / 8.0GiB"); /*Realistic ram usage*/
    break;
    case "skills": /*Command which displays skills.*/
        print("HTML, CSS, JavaScript");
        print("Python, Lua");
        print("React, Next.js");
        print("C, C++, C#");
        print("Databases");
        print("Networking & Cloud Services");
        print("Cybersecurity,  CTFs");
    break;
    case "projects":/*Command which displays my projects*/
        print("You can find all my projects on my GitHub: https://github.com/dmtr-1337")
        print("Card-Game - Card Game made using HTML/CSS/JS, you play against the computer.");
        print("C++ Bit-Merger - Allows you to merge 2 smaller integers to 1 bigger integer.");
        print("php-reverseshell - PHP reverse shell implementation designed for penetration testing and educational purposes. It establishes a remote connection back to your listener.");
    break;
    default: /*Unknown command handler*/
    print(`Command not found: ${cmd}`);
  }
}


document.addEventListener("DOMContentLoaded", () => /*Wait for html load before initialize*/
{ 
  loadPrompt(); /*Initialize prompt after page is ready*/
});

