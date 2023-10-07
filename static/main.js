$(document).ready(function () {
    let dataTable = $('#miTabla').DataTable({
        "drawCallback": function (settings) {
            // Formatea los precios en cada celda de la tercera columna (índice 2)
            this.api().column(2).nodes().each(function (cell) {
                let precio = $(cell).html();
                $(cell).html(formatPrice(precio));
            });
        }
    });

    let searchColumn = 0; // 0 para código (por defecto)

    // Captura el evento de clic en los cuadros de verificación
    $('#search_by_code, #search_by_name').on('change', function () {
        searchColumn = $(this).attr('id') === 'search_by_code' ? 0 : 1; // 0 para código, 1 para nombre
        dataTable.columns().search('').draw(); // Limpiar todas las búsquedas antes de configurar la nueva
    });

    // Habilita la edición de precios al hacer doble clic en la celda de precio
    $('#miTabla tbody').on('dblclick', 'td:eq(2)', function () {
        let cell = dataTable.cell(this);
        let precio = cell.data();
        cell.data('<input type="number" step="0.01" class="edit-price" value="' + precio + '">');
        $('.edit-price').focus().on('blur', function () {
            let nuevoPrecio = $(this).val();
            cell.data(formatPrice(nuevoPrecio)).draw();
        });
    });

    // Formatea el precio para mostrarlo con dos decimales
    function formatPrice(price) {
        return parseFloat(price).toFixed(2);
    }

    // Configura la búsqueda al escribir en el cuadro de búsqueda
    $('#miTabla_filter input').on('keyup', function () {
        dataTable.column(searchColumn).search(this.value).draw();
    });



});