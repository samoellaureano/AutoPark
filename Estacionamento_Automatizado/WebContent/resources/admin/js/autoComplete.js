$(function() {
  var funcionarios = [
    "Samoel Laureano Angélica",
    "Felipe Schulz",
    "Eduardo Mussi"
  ];
  $("#buscarFunc" ).autocomplete({
    source: funcionarios
  });
});

$(function() {
  var estacionamento = [
    "Estacionamento 001",
    "Estacionamento 002",
    "Estacionamento 003"
  ];
  $("#buscarEst" ).autocomplete({
    source: estacionamento
  });
});