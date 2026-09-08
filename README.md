# Equipment Operator Verification System

This is a GitHub Pages-based verification system used to check operator competency, training, certificate evidence, and authorization status before allowing equipment operation on site.

## Purpose

This system helps to:

- Verify operator identity with photo
- Confirm training and certification
- Check validity status: expiry or no expiry
- Confirm site authorization
- Support WSH / audit compliance

## Supported Equipment

This system can support:

- Bobcat / Skid Steer Loader
- Forklift
- MEWP
- Rigger / Signalman
- Other trained personnel

## File Structure

```text
bobcat-operator-verification/
│
├── index.html
├── style.css
├── script.js
├── staff-data.js
├── README.md
│
├── photos/
│   ├── gokul.jpg
│   ├── suman.jpg
│   └── forklift-operator.jpg
│
└── certs/
    ├── gokul.pdf
    ├── suman.pdf
    └── forklift-operator.pdf

QR Code Verification Links

Bobcat Operators

- BBE-BO-001 — Gokul  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-001
- BBE-BO-002 — Suman  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-002
- BBE-BO-003 — Lim Seng Leong  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-003
- BBE-BO-004 — Rashedul Islam Shamsul Haque  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-004
- BBE-BO-005 — Kaliyamoorthy Aravinth  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-005
- BBE-BO-006 — Shek Amir  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-006
- BBE-BO-007 — Rajendran Gopi  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-007
- BBE-BO-008 — Murugesan Parthiban  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-BO-008

Forklift Operators

- BBE-FL-001 — Lim Seng Leong  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-FL-001
- BBE-FL-002 — Ramachandran Karuppaiah  
  https://nbloong.github.io/bobcat-operator-verification/?id=BBE-FL-002

Printable QR files for the four newest Bobcat operators are stored in the `qrcodes/` folder.
