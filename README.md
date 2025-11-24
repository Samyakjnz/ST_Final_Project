# ST_Final_Project — Software Testing Project
### Mutation Testing using Mocha, Chai, and Stryker Mutator
#### IIIT Bangalore — Term I (2025–26)

---

## 1. Project Overview

This project implements **Mutation Testing** on a JavaScript codebase using:

- **Mocha** – test runner  
- **Chai** – assertion library  
- **Stryker Mutator** – mutation testing framework  

The project includes:  
- Core utility modules (calculator, math, arrays, strings)  
- Additional modules (date, search, validation, stats, number utils)  
- Integration logic in `index.js`  
- Unit tests and integration tests  
- Mutation testing analysis  

Goal: create a strong test suite capable of killing most mutants.

---

## 2. Tools & Technologies

| Tool | Purpose |
|------|---------|
| Node.js | Runtime |
| Mocha | Test runner |
| Chai | Assertions |
| Stryker Mutator | Mutation testing |
| WSL Ubuntu | Environment |
| Git & GitHub | Version control & submission |

---

## 3. Folder Structure

```
ST_Final_Project/
│
├── src/
│   ├── calculator.js
│   ├── mathUtils.js
│   ├── stringUtils.js
│   ├── arrayUtils.js
│   ├── index.js
│   └── utils/
│       ├── dateUtils.js
│       ├── searchUtils.js
│       ├── dataValidation.js
│       ├── statsUtils.js
│       └── numberUtils.js
│
├── test/
│   ├── calculator.test.js
│   ├── mathUtils.test.js
│   ├── stringUtils.test.js
│   ├── arrayUtils.test.js
│   ├── integration.test.js
│   ├── dateUtils.test.js
│   ├── searchUtils.test.js
│   ├── dataValidation.test.js
│   ├── statsUtils.test.js
│   └── numberUtils.test.js
│
├── package.json
├── package-lock.json
├── stryker.conf.json
└── README.md
```

---

## 4. Running the Project

### Install dependencies:
```
npm install
```

### Run all tests:
```
npm test
```

---

## 5. Mutation Testing

### Run Stryker:
```
npx stryker run
```

### Mutation report path:
```
reports/mutation/mutation.html
```

This HTML file contains:  
- Mutation score  
- Killed mutants  
- Survived mutants  
- Coverage gaps  
- Detailed per-file mutation view  

---

## 6. Test Strategy

### Unit Tests  
Every module has dedicated tests covering:
- Normal cases  
- Edge cases  
- Invalid inputs  
- Error handling  
- Boundary checks  

### Integration Tests  
`integration.test.js` verifies:
- Module interactions  
- Combined output structure  
- Behavior of `calculateAndFormatSummary()`  

### Mutation-Driven Enhancements  
Survived mutants were inspected and additional tests added.

---

## 7. LOC Summary

The project contains **700+ LOC (source only)** across:
- Core modules  
- Five extended utils  
- Integration  

Tests are NOT counted toward LOC.

---

## 8. Conclusion

This project demonstrates:
- Strong unit + integration testing  
- Effective use of mutation testing  
- Enhanced test quality via mutant feedback  
- Clean modular design  
- High-quality JavaScript utilities  

---

## 9. Author

**Md. Owais**  **Samyak Jain**
IIIT Bangalore  
CSE731 — Software Testing (Term I 2025–26)
