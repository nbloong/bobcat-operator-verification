# Bobcat Operator Verification System

This is a simple GitHub Pages system for Bobcat operator verification.

## Files

- `index.html` - main webpage
- `style.css` - webpage design
- `script.js` - search and validity logic
- `staff-data.js` - operator data
- `photos/` - operator photos

## How to upload photos

Upload these files into the `photos` folder:

- `gokul.jpg`
- `suman.jpg`

File names must match the values inside `staff-data.js`.

## How to use

Search by:

- `BBE-BO-001`
- `BBE-BO-002`
- `Gokul`
- `Suman`

## QR link format

After GitHub Pages is active, use this format:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/?id=BBE-BO-001
```

and

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/?id=BBE-BO-002
```

You can convert those links into QR codes later.

## Important

This system is static. It does not upload data automatically.
To update staff records, edit `staff-data.js`.
To update photos, replace the photo files inside the `photos` folder.
