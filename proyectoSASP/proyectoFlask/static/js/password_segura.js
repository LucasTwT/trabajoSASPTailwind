const passwordInput = document.getElementById('contraseña');

passwordInput.addEventListener('input', function () {
  const val = passwordInput.value;

  document.getElementById('length').className = val.length >= 8 ? 'text-green-500' : 'text-red-500';
  document.getElementById('mayus').className = /[A-Z]/.test(val) ? 'text-green-500' : 'text-red-500';
  document.getElementById('minus').className = /[a-z]/.test(val) ? 'text-green-500' : 'text-red-500';
  document.getElementById('numero').className = /\d/.test(val) ? 'text-green-500' : 'text-red-500';
  document.getElementById('especial').className = /[\W_]/.test(val) ? 'text-green-500' : 'text-red-500';
});