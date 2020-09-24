$(function() {
  var esportes = [
    "Samoel Laureano Angélica",
    "Felipe Schulz",
    "Eduardo Mussi"
  ];
  $("#buscarFunc" ).autocomplete({
    source: esportes
  });
});