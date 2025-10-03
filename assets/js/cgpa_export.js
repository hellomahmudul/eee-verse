
        document.addEventListener('DOMContentLoaded', () => {
            const exportBtn = document.getElementById('exportBtn');
            if (exportBtn) exportBtn.addEventListener('click', handleExportClick);
        });

        function handleExportClick() {
            const form = document.getElementById('gpaForm');
            if (!form) return;

            // Collect rows by pairing label -> (next input) -> (next select)
            const rows = [];
            const labels = form.querySelectorAll('label');
            
            labels.forEach(label => {
                const input = label.nextElementSibling && label.nextElementSibling.matches('input')
                    ? label.nextElementSibling
                    : null;

                if (!input) return; // skip if structure isn’t label->input
                
                const course = label.textContent.trim();
                const credit = (input.value || '').trim();
                const gradePoint = (input.nextElementSibling ? input.nextElementSibling.value : '').trim(); // for GPA input

                rows.push({ course, credit, gradePoint });
            });

            // Build printable HTML using the dynamic page title
            const resultContainer = document.getElementById('resultContainer');
            const resultHTML = resultContainer ? resultContainer.innerHTML : '';
            const tableRowsHTML = rows.map(r => `
                <tr>
                    <td>${escapeHtml(r.course)}</td>
                    <td>${escapeHtml(r.credit)}</td>
                    <td>${escapeHtml(r.gradePoint || '—')}</td>
                </tr>
            `).join('');

            const pageTitle = document.title; // Dynamic title based on the <title> tag content

            const docHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(pageTitle)}</title> <!-- Set title dynamically from the current page's title -->
  <style>
    :root {
      --text:#111; --muted:#555; --line:#e6e6e6; --bg:#fff; --box:#f8f9fb;
    }
    @media (prefers-color-scheme: dark) {
      :root { --text:#eee; --muted:#bbb; --line:#333; --bg:#121212; --box:#1b1b1b; }
    }
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
      margin: 24px; color: var(--text); background: var(--bg);
    }
    h1 { font-size: 20px; margin: 0 0 16px; }
    .meta { color: var(--muted); font-size: 12px; margin-bottom: 16px; }
    table {
      width: 100%; border-collapse: collapse; margin: 8px 0 24px;
      border: 1px solid var(--line);
    }
    th, td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; }
    th { background: var(--box); font-weight: 600; }
    tr:last-child td { border-bottom: 0; }
    .result-box {
      border: 1px solid var(--line);
      background: var(--box);
      padding: 14px;
      border-radius: 10px;
    }
    .result-box h2 {
      font-size: 16px; margin: 0 0 8px 0;
    }
    .footnote { margin-top: 12px; color: var(--muted); font-size: 11px; }
    @page { margin: 18mm; }
  </style>
</head>
<body>
  <h1>${escapeHtml(pageTitle)}</h1> <!-- Set header dynamically based on the page title -->
  

  <table>
    <thead>
      <tr>
        <th>Course</th>
        <th>Credit</th>
        <th>Grade Point</th>
      </tr>
    </thead>
    <tbody>
      ${tableRowsHTML}
    </tbody>
  </table>

  <div class="result-box">
    <h2>Result</h2>
    ${resultHTML || '<div class="footnote">No result has been calculated yet.</div>'}
  </div>
</br>
<div class="meta">Generated on ${new Date().toLocaleString()}</div>
  <script>
    // Auto-open print dialog after the new window finishes loading
    window.addEventListener('load', () => {
      setTimeout(() => { window.print(); }, 50);
    });
  </script>
</body>
</html>
            `;

            // Open a new window for printing
            const printWin = window.open('', '_blank');
            if (!printWin) {
                alert('Please allow pop-ups to export/print the report.');
                return;
            }
            printWin.document.open();
            printWin.document.write(docHTML);
            printWin.document.close();
        }

        // Basic HTML escaping to avoid accidental HTML injection
        function escapeHtml(str) {
            return String(str)
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#039;');
        }
