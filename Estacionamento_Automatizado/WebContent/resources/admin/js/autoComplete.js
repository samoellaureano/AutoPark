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
  var estacionamentos = [
    "Estacionamento 001",
    "Estacionamento 002",
    "Estacionamento 003"
  ];
  $("#buscarEst" ).autocomplete({
    source: estacionamentos
  });
});

$(function() {
  var registros = [
    "Samoel Laureano Angélica",
    "Felipe Schulz"
  ];
  $("#buscarReg" ).autocomplete({
    source: registros
  });
});