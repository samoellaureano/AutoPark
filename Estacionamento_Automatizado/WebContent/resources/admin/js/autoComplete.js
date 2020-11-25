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
    "Estacionamento 01",
    "Estacionamento 02",
    "Estacionamento 03"
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