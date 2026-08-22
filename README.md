# 🛡️ CYBERVIGIE — Vigilance Cyber & Traçabilité des Menaces

**CYBERVIGIE** est une plateforme souveraine de veille, de traçabilité et de suivi en temps réel des menaces cyber (exfiltrations de données, attaques par ransomware, activités APT, fuites sur forums underground, canaux Telegram et avis certifiés ANSSI).

> **Architecture 100% Souveraine & Hors-IA** : Fonctionne en scraping direct et via des APIs ouvertes sans aucune dépendance à des services d'IA tiers.

---

## 🚀 Mise en Ligne Rapide sur GitHub Pages

### Méthode 1 : Automatisation via GitHub Actions (Recommandé)

Le projet intègre un fichier de workflow automatisé dans `.github/workflows/deploy.yml`.

1. **Pousser votre code sur votre dépôt GitHub** :
   ```bash
   git add .
   git commit -m "feat: déploiement CYBERVIGIE"
   git push origin main
   ```
2. **Activer GitHub Pages** :
   - Rendez-vous sur votre dépôt GitHub dans **Settings** > **Pages**.
   - Dans la section **Source**, sélectionnez **GitHub Actions**.
   - Le déploiement s'exécutera automatiquement. Votre application sera en ligne à l'adresse :  
     `https://<votre-pseudo-github>.github.io/<nom-du-depot>/`

---

## 🛠️ Développement & Exécution Locale

- **Lancer le serveur de développement** :
  ```bash
  npm run dev
  ```
- **Générer le bundle de production** :
  ```bash
  npm run build
  ```
- **Tester le build localement** :
  ```bash
  npm run preview
  ```

---

## 📋 Fonctionnalités Complètes

1. **Tracker des Victimes** : Analyse cartographique et sectorielle des revendications de ransomware (données `ransomware.live` & local cache).
2. **Tracker de Forums APT & Underground** : Surveillance continue des plateformes d'extorsion et communautés underground.
3. **Canaux Telegram APT** : Traçabilité des canaux de diffusion de logs et d'identifiants volés.
4. **Alertes & Avis ANSSI / CERT-FR** : Flux des vulnérabilités critiques publiées par les autorités.
5. **Configuration des Scrapers de Sources** :
   - Ajout et modification de nouveaux sites d'information à scraper.
   - Support des formats **RSS / Atom**, **API REST**, **HTML DOM (Sélecteurs CSS/XPath)** et **Telegram Web**.
   - **Console de test et simulation de scraping en direct**.
   - Exportation & Importation JSON des configurations de sources.
   - Sauvegarde locale automatique (`localStorage`).
