# Setup Guide - Viaggio Business Monaco 2026

## 1. Configurazione Google Sheets

### Crea il foglio Google Sheets

1. Vai su [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio chiamato "Leads Monaco 2026"
3. Nel primo foglio (Sheet1), rinominalo in "Leads"
4. Aggiungi le seguenti colonne nella prima riga:
   - A1: `timestamp`
   - B1: `name`
   - C1: `phone`
   - D1: `email`
   - E1: `consent_marketing`
   - F1: `source_campaign`
   - G1: `user_agent`

### Crea lo Apps Script

1. Nel foglio, vai su **Estensioni** > **Apps Script**
2. Sostituisci tutto il codice con:

```javascript
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and the "Leads" sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    
    // Append a new row with the data
    sheet.appendRow([
      new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.consent_marketing || false,
      data.source_campaign || 'ads_monaco_2026',
      data.user_agent || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Lead saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Salva il progetto (nome suggerito: "Monaco Leads Webhook")
4. Clicca su **Deploy** > **New deployment**
5. Seleziona il tipo: **Web app**
6. Configura:
   - **Description**: Monaco 2026 Lead Capture
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Clicca su **Deploy**
8. Copia l'**URL Web App** generato

### Configura le variabili d'ambiente

1. Crea un file `.env` nella root del progetto (copia da `.env.example`)
2. Incolla l'URL dello script in `VITE_SHEETS_WEBHOOK_URL`:

```env
VITE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

## 2. Test dell'integrazione

1. Avvia il progetto in locale:
```bash
npm install
npm run dev
```

2. Apri il browser su `http://localhost:8080`
3. Completa il processo di gratta e vinci
4. Compila il form con dati di test
5. Verifica che i dati compaiano nel foglio Google Sheets

## 3. Deploy in produzione

### Opzione A: Deploy su Lovable

1. Clicca su "Publish" nell'interfaccia Lovable
2. Vai su Project > Settings > Environment Variables
3. Aggiungi `VITE_SHEETS_WEBHOOK_URL` con l'URL dello script

### Opzione B: Deploy manuale

1. Build del progetto:
```bash
npm run build
```

2. Deploy della cartella `dist/` sul tuo hosting preferito
3. Configura le variabili d'ambiente nel pannello di hosting

## 4. Monitoraggio e manutenzione

### Verifica i lead ricevuti

- Controlla regolarmente il foglio "Leads" su Google Sheets
- Verifica che tutti i campi siano popolati correttamente

### Backup dei dati

- Fai backup regolari del foglio Google Sheets
- Considera l'esportazione periodica in CSV

### Limiti e considerazioni

- Google Apps Script ha limiti di quota giornalieri (~ 20.000 invocazioni/giorno)
- Per volumi più alti, considera l'integrazione con Supabase

## 5. Troubleshooting

### I lead non arrivano al foglio

1. Verifica che l'URL webhook sia corretto nel file `.env`
2. Controlla i log della console del browser (F12)
3. Verifica che lo script Apps Script sia deployato correttamente
4. Controlla che le autorizzazioni siano impostate su "Anyone"

### Errori CORS

Se ricevi errori CORS, verifica che lo script Apps Script sia configurato con "Who has access: Anyone"

### Rate limiting

Se ricevi errori di rate limiting client-side, cancella il localStorage:
```javascript
localStorage.removeItem('submitAttempts')
```

## 6. Funzionalità opzionali

### Abilitare Supabase (storage parallelo)

Se vuoi salvare i lead anche su Supabase:

1. Abilita Lovable Cloud dal progetto
2. Crea la tabella `leads` con lo schema fornito nel brief
3. Imposta `VITE_ENABLE_SUPABASE="true"` nel file `.env`
4. Aggiungi `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

### Abilitare Captcha

Per abilitare la protezione captcha (richiede implementazione aggiuntiva):

1. Registrati su hCaptcha o Cloudflare Turnstile
2. Ottieni le chiavi API
3. Implementa il componente captcha nel form
4. Imposta `VITE_ENABLE_CAPTCHA="true"`

## Supporto

Per domande o problemi, contatta il team di sviluppo o consulta la documentazione di:
- [Google Apps Script](https://developers.google.com/apps-script)
- [Lovable Docs](https://docs.lovable.dev)
