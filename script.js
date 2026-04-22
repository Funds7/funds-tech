<script>
function login(){
  const user = document.getElementById("user").value.trim();

  if(!user){
    alert("Enter username");
    return;
  }

  // save user
  localStorage.setItem("user", user);

  // redirect safely
  window.location.href = "./dashboard.html";
}
</script>
