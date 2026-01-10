document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Get or initialize users array
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = loginForm.querySelectorAll("input");
      const username = inputs[0].value.trim();
      const password = inputs[1].value.trim();

      if (!username || !password) {
        alert("Please fill in all fields");
        return;
      }

      // Find user
      let user = users.find(u => 
        (u.username && u.username.toLowerCase() === username.toLowerCase()) ||
        (u.email && u.email.toLowerCase() === username.toLowerCase())
      );

      if (!user) {
        // Create new user if doesn't exist
        user = {
          id: Date.now(),
          username: username,
          email: username.includes("@") ? username : "",
          password: password,
          avatar: `https://i.pravatar.cc/48?img=${Math.floor(Math.random() * 70) + 1}`,
          bio: ""
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      } else if (user.password !== password) {
        alert("Incorrect password");
        return;
      }

      // Set logged in user
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      // Redirect to home page
      window.location.href = "index.html";
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = registerForm.querySelectorAll("input");
      const email = inputs[0].value.trim();
      const fullName = inputs[1].value.trim();
      const username = inputs[2].value.trim();
      const password = inputs[3].value.trim();

      if (!email || !fullName || !username || !password) {
        alert("Please fill in all fields");
        return;
      }

      // Check if username already exists
      if (users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
        alert("Username already taken");
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        username: username,
        fullName: fullName,
        email: email,
        password: password,
        avatar: `https://i.pravatar.cc/48?img=${Math.floor(Math.random() * 70) + 1}`,
        bio: ""
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      alert("Account created successfully!");
      window.location.href = "index.html";
    });
  }

  // ---------- PROFILE FOLLOW BUTTON (profile page only) ----------
  const followBtn = document.querySelector(".follow-btn");
  if (followBtn) {
    followBtn.addEventListener("click", () => {
      if (followBtn.innerText === "Follow") {
        followBtn.innerText = "Following";
        followBtn.style.background = "#ddd";
        followBtn.style.color = "#000";
      } else {
        followBtn.innerText = "Follow";
        followBtn.style.background = "#0095f6";
        followBtn.style.color = "#fff";
      }
    });
  }

  // ---------- PROFILE IMAGE UPLOAD (profile page only) ----------
  const imageUpload = document.getElementById("imageUpload");
  const profileImage = document.getElementById("profileImage");
  if (imageUpload && profileImage) {
    imageUpload.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

});