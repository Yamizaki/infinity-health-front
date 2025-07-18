// Tipos para jsPDF
declare global {
  interface Window {
    jspdf: typeof import('jspdf');
  }
}

export const downloadPDF = async (element: HTMLElement, fileName: string): Promise<void> => {
  try {
    if (!element) throw new Error('No se proporcionó ningún elemento');
    
    // Crear PDF con márgenes
    const doc = new window.jspdf.jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;
    
    // Función para agregar texto con manejo de saltos de página
    const addText = (text: string, isHeader = false) => {
      if (y > 270) { // Nueva página si se pasa del margen inferior
        doc.addPage();
        y = 20;
      }
      
      doc.setFontSize(isHeader ? 16 : 12);
      
      // Agregar espacios al texto para que se vea mejor en el PDF
      const textWithSpaces = text.replace(/\s/g, '');
      // Dividir texto en líneas
      const lines = doc.splitTextToSize(textWithSpaces, pageWidth - (margin * 2 ) );
      
      // Agregar cada línea
      lines.forEach((line: string) => {
        if (y > 270) {
          doc.addPage();
          y = 40;
        }
        doc.text(line, margin, y);
        y += 1; // Espaciado fijo entre líneas
      });

      
      // Espacio adicional después de cada bloque
      y += isHeader ? 1 : 5;
    };
     // Ajustar posición inicial más abajo
    y = 40;
    
    //LOGO DE INFINITY
    doc.addImage('../public/img/health-logo-light-mode.png', 'PNG', pageWidth - margin - 40, margin + 10, 40, 13);
    
    //TITULO
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(fileName, margin, y);
    y += 10;
    
    // Línea decorativa
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    
    //FECHA
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Dieta generada el: ${new Date().toLocaleDateString()}`, margin, y);
    y += 5;
    
    // Procesar cada comida
    element.querySelectorAll('.border-gray-100').forEach(meal => {
      // Obtener el nombre de la comida y las calorías
      const mealName = meal.querySelector('h3')?.textContent?.trim() || '';
      addText('');
      const mealCalories = meal.querySelector('.bg-yellow-100')?.textContent?.trim() || '';
      
            // Agregar nombre de la comida en color y negrita
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(23, 152, 224); // Color azul
      doc.text(mealName, pageWidth / 2, y, { align: 'center' });
      y += 8;
      
      // Agregar calorías centradas debajo del título
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100); // Gris oscuro
      const caloriesText = mealCalories;
      const caloriesWidth = doc.getStringUnitWidth(caloriesText) * doc.getFontSize() / doc.internal.scaleFactor;
      doc.text(caloriesText, (pageWidth - caloriesWidth) / 2, y);
      y += 10;
      
      // Restaurar color por defecto
      doc.setTextColor(0, 0, 0);
      
      // Procesar los items de la comida
      const items = meal.querySelectorAll('li');
      items.forEach(item => {
        const food = item.querySelector('.text-gray-700')?.textContent?.trim() || '';
        const quantity = item.querySelector('.text-gray-500')?.textContent?.trim() || '';
        const calories = item.querySelector('.text-gray-400')?.textContent?.trim() || '';
        
        // Formatear línea de ítem con mejor espaciado
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        
        // Asegurar que haya espacio suficiente para la siguiente línea
        if (y > 260) {
          doc.addPage();
          y = 20;
        }
        
                // Agregar viñeta y nombre del alimento
        doc.setTextColor(0, 0, 0); // Negro para el texto normal
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        
        // Calcular el ancho del texto para manejar saltos de línea
        const bullet = '• ';
        const foodText = `${bullet}${food}`;
        const foodLines = doc.splitTextToSize(foodText, pageWidth - (margin * 2) - 30); // Ajustar ancho para dejar espacio a la derecha
        
        // Imprimir cada línea del alimento
        foodLines.forEach((line: string) => {
          if (y > 260) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, margin, y);
          y += 5; // Espaciado entre líneas del mismo alimento
        });
        
        // Ajustar posición Y después de imprimir todas las líneas del alimento
        y = Math.max(y, y + ((foodLines.length - 1) * 5));
        
        // Agregar cantidad y calorías en la misma línea
        const itemInfo = `${quantity} ${calories}`;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(58, 176, 249); // Color azul para la información nutricional
        doc.text(itemInfo, pageWidth - margin, y, { align: 'right' });
        
        
        y += 5; // Espacio entre líneas
      });
      
      // Agregar espacio entre comidas
      addText('');
    });

    // --- PIE DE PÁGINA ---
    // Añadir línea decorativa
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    
    // Agregar logo de Infinity Health
    try {
      const logoWidth = 80;
      const logoHeight = 25;
      const logoX = (pageWidth - logoWidth) / 2; // Centrar el logo
      doc.addImage(
        '../public/img/health-logo-light-mode.png',
        'PNG',
        logoX,
        y,
        logoWidth,
        logoHeight
      );
      y += logoHeight + 10;
    } catch (e) {
      console.log('No se pudo cargar el logo:', e);
    }
    
    // Texto de descargo de responsabilidad
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120); // Gris un poco más oscuro
    
    const disclaimer = 'Este es un plan referencial generado por Infinity Health. Para una atención personalizada, te recomendamos consultar con tu nutricionista o médico de cabecera.';
    const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2));
    
    // Calcular posición Y para centrar verticalmente
    const disclaimerHeight = disclaimerLines.length * 4; // Altura aproximada del texto
    const startY = y + ((270 - y - disclaimerHeight) / 2);
    
    doc.text(disclaimerLines, pageWidth / 2, startY, { align: 'center' });
    
    // Añadir información de copyright
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`© ${new Date().getFullYear()} Infinity Health - Todos los derechos reservados`, pageWidth / 2, 285, { align: 'center' });

    // Guardar PDF
    doc.save(`${fileName}.pdf`);
    
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
  }
};