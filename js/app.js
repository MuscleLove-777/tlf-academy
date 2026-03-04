/* ============================================
   TLF Academy - Main Application
   ============================================ */

const App = {
    levels: [],
    allModules: [],
    currentModuleId: null,
    progress: {},
    quizResults: {},

    init() {
        this.levels = [
            LEVEL1_DATA, LEVEL2_DATA, LEVEL3_DATA, LEVEL4_DATA, LEVEL5_DATA,
            LEVEL6_DATA, LEVEL7_DATA, LEVEL8_DATA, LEVEL9_DATA, LEVEL10_DATA,
            LEVEL11_DATA, LEVEL12_DATA, LEVEL13_DATA
        ];

        this.allModules = [];
        this.levels.forEach(level => {
            level.modules.forEach(mod => {
                this.allModules.push({
                    ...mod,
                    levelId: level.id,
                    levelTitle: level.title
                });
            });
        });

        this.loadProgress();
        this.buildSidebar();
        this.showDashboard();

        if (localStorage.getItem('tlf-darkmode') === 'true') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        this.updateGlobalProgress();

        document.addEventListener('click', (e) => {
            const header = e.target.closest('.collapsible-header');
            if (header) {
                header.parentElement.classList.toggle('open');
            }
        });
    },

    loadProgress() {
        try {
            const saved = localStorage.getItem('tlf-progress');
            if (saved) this.progress = JSON.parse(saved);
            const savedQuiz = localStorage.getItem('tlf-quiz-results');
            if (savedQuiz) this.quizResults = JSON.parse(savedQuiz);
        } catch (e) {
            this.progress = {};
            this.quizResults = {};
        }
    },

    saveProgress() {
        localStorage.setItem('tlf-progress', JSON.stringify(this.progress));
        localStorage.setItem('tlf-quiz-results', JSON.stringify(this.quizResults));
    },

    completeModule(moduleId) {
        this.progress[moduleId] = { completed: true, completedAt: new Date().toISOString() };
        this.saveProgress();
        this.buildSidebar();
        this.updateGlobalProgress();
    },

    saveQuizResult(moduleId, result) {
        this.quizResults[moduleId] = {
            ...result,
            attemptedAt: new Date().toISOString()
        };
        this.saveProgress();
    },

    isModuleCompleted(moduleId) {
        return this.progress[moduleId] && this.progress[moduleId].completed;
    },

    updateGlobalProgress() {
        const total = this.allModules.length;
        const completed = this.allModules.filter(m => this.isModuleCompleted(m.id)).length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        const fill = document.getElementById('globalProgressFill');
        const text = document.getElementById('globalProgressText');
        if (fill) fill.style.width = pct + '%';
        if (text) text.textContent = `${pct}% 完了 (${completed}/${total})`;
    },

    buildSidebar() {
        const nav = document.getElementById('sidebarNav');
        let html = '';

        this.levels.forEach(level => {
            const levelModules = level.modules;
            const completedCount = levelModules.filter(m => this.isModuleCompleted(m.id)).length;
            const isCurrentLevel = this.currentModuleId && levelModules.some(m => m.id === this.currentModuleId);

            html += `
                <div class="sidebar-level">
                    <div class="sidebar-level-header ${isCurrentLevel ? 'expanded' : ''}"
                         onclick="App.toggleLevel(this)">
                        <span>${level.icon} Level ${level.id}: ${level.title}</span>
                        <span style="display:flex;align-items:center;gap:8px;">
                            <span style="font-size:0.7rem;opacity:0.7;">${completedCount}/${levelModules.length}</span>
                            <span class="chevron">▶</span>
                        </span>
                    </div>
                    <div class="sidebar-modules ${isCurrentLevel ? 'expanded' : ''}">
            `;

            levelModules.forEach(mod => {
                const isCompleted = this.isModuleCompleted(mod.id);
                const isActive = this.currentModuleId === mod.id;

                html += `
                    <div class="sidebar-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}"
                         onclick="App.showModule(${mod.id})">
                        <span class="status-dot"></span>
                        <span>${mod.title}</span>
                    </div>
                `;
            });

            html += '</div></div>';
        });

        nav.innerHTML = html;
    },

    toggleLevel(header) {
        header.classList.toggle('expanded');
        const modules = header.nextElementSibling;
        modules.classList.toggle('expanded');
    },

    toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    },

    showDashboard() {
        this.currentModuleId = null;
        this.showView('dashboardView');
        this.buildSidebar();

        const container = document.getElementById('dashboardView');
        const totalModules = this.allModules.length;
        const completedModules = this.allModules.filter(m => this.isModuleCompleted(m.id)).length;
        const totalQuizzes = Object.keys(this.quizResults).length;
        const avgScore = totalQuizzes > 0
            ? Math.round(Object.values(this.quizResults).reduce((sum, r) => sum + r.percentage, 0) / totalQuizzes)
            : 0;

        let html = `
            <div class="fade-in">
                <div class="dashboard-hero">
                    <h2>TLF Academy へようこそ</h2>
                    <p>臨床試験の Tables, Listings, Figures を基礎からプロレベルまで学べる総合教育プラットフォームです。</p>
                </div>

                <div class="dashboard-grid">
                    <div class="stat-card">
                        <div class="stat-value">${completedModules}/${totalModules}</div>
                        <div class="stat-label">モジュール完了</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${totalQuizzes}</div>
                        <div class="stat-label">クイズ受験数</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${avgScore}%</div>
                        <div class="stat-label">平均クイズスコア</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.getEstimatedTime()}</div>
                        <div class="stat-label">残り学習時間(目安)</div>
                    </div>
                </div>

                <h2 style="margin-bottom:20px;font-size:1.3rem;">学習コース</h2>
                <div class="dashboard-grid">
        `;

        this.levels.forEach(level => {
            const levelMods = level.modules;
            const completed = levelMods.filter(m => this.isModuleCompleted(m.id)).length;
            const pct = Math.round((completed / levelMods.length) * 100);

            html += `
                <div class="level-card level-${level.id}" onclick="App.showModule(${levelMods[0].id})">
                    <div class="level-card-header">
                        <div class="level-icon">${level.icon}</div>
                        <div>
                            <h3>Level ${level.id}: ${level.title}</h3>
                            <div class="level-desc">${level.description} (${levelMods.length}モジュール)</div>
                        </div>
                    </div>
                    <div class="level-progress">
                        <div class="level-progress-bar">
                            <div class="level-progress-fill" style="width:${pct}%"></div>
                        </div>
                        <div class="level-progress-text">${completed}/${levelMods.length} 完了 (${pct}%)</div>
                    </div>
                </div>
            `;
        });

        html += '</div></div>';
        container.innerHTML = html;
    },

    getEstimatedTime() {
        let totalMinutes = 0;
        this.allModules.forEach(m => {
            if (!this.isModuleCompleted(m.id)) {
                const match = m.duration.match(/(\d+)/);
                if (match) totalMinutes += parseInt(match[1]);
            }
        });
        if (totalMinutes === 0) return '完了！';
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        return hours > 0 ? `約${hours}時間${mins}分` : `約${mins}分`;
    },

    showModule(moduleId) {
        const mod = this.allModules.find(m => m.id === moduleId);
        if (!mod) return;

        this.currentModuleId = moduleId;
        this.showView('moduleView');
        this.buildSidebar();

        document.getElementById('sidebar').classList.remove('open');

        const container = document.getElementById('moduleView');
        const level = this.levels.find(l => l.id === mod.levelId);
        const modIndex = this.allModules.findIndex(m => m.id === moduleId);
        const prevMod = modIndex > 0 ? this.allModules[modIndex - 1] : null;
        const nextMod = modIndex < this.allModules.length - 1 ? this.allModules[modIndex + 1] : null;

        let html = `
            <div class="fade-in">
                <div class="module-header">
                    <div class="module-breadcrumb">
                        <a onclick="App.showDashboard()">ダッシュボード</a>
                        &nbsp;/&nbsp;
                        <a onclick="App.showModule(${level.modules[0].id})">Level ${level.id}: ${level.title}</a>
                        &nbsp;/&nbsp;
                        ${mod.title}
                    </div>
                    <h1 class="module-title">${mod.title}</h1>
                    <div class="module-meta">
                        <span>⏱ ${mod.duration}</span>
                        <span>${this.isModuleCompleted(moduleId) ? '✅ 完了済み' : '📖 未完了'}</span>
                    </div>
                </div>
                <div class="module-body">
                    ${mod.content}
                </div>
                <div class="module-nav">
                    <div>
                        ${prevMod ? `
                            <button class="btn btn-outline" onclick="App.showModule(${prevMod.id})">
                                ← ${prevMod.title}
                            </button>
                        ` : ''}
                    </div>
                    <div style="display:flex;gap:12px;">
                        ${mod.quiz && mod.quiz.length > 0 ? `
                            <button class="btn btn-primary btn-lg" onclick="App.startQuiz(${moduleId})">
                                理解度チェック (${mod.quiz.length}問)
                            </button>
                        ` : `
                            <button class="btn btn-success btn-lg" onclick="App.completeModule(${moduleId}); App.goToNextModule(${moduleId});">
                                完了して次へ
                            </button>
                        `}
                    </div>
                    <div>
                        ${nextMod ? `
                            <button class="btn btn-outline" onclick="App.showModule(${nextMod.id})">
                                ${nextMod.title} →
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.querySelector('.content').scrollTop = 0;

        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    },

    startQuiz(moduleId) {
        const mod = this.allModules.find(m => m.id === moduleId);
        if (!mod || !mod.quiz) return;

        this.showView('quizView');
        Quiz.start(moduleId, mod.quiz);
    },

    goToNextModule(currentModuleId) {
        const idx = this.allModules.findIndex(m => m.id === currentModuleId);
        if (idx < this.allModules.length - 1) {
            this.showModule(this.allModules[idx + 1].id);
        } else {
            this.showDashboard();
            this.showCompletionMessage();
        }
    },

    showCompletionMessage() {
        const modal = document.getElementById('modalContent');
        const overlay = document.getElementById('modalOverlay');
        modal.innerHTML = `
            <h2>🎓 おめでとうございます！</h2>
            <div class="score-circle pass" style="font-size:2.5rem;">🏆</div>
            <p>
                全モジュールを完了しました！<br>
                あなたはTLFの基礎から実践まで一通り学びました。<br>
                実際のプロジェクトで経験を積んで、TLFのプロを目指しましょう！
            </p>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="App.closeModal()">ダッシュボードへ</button>
            </div>
        `;
        overlay.style.display = 'flex';
    },

    closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    },

    showView(viewId) {
        ['dashboardView', 'moduleView', 'quizView'].forEach(id => {
            document.getElementById(id).style.display = id === viewId ? 'block' : 'none';
        });
    },

    switchCodeTab(button, lang) {
        const tabContainer = button.closest('.code-tabs');
        tabContainer.querySelectorAll('.code-tab-btn').forEach(btn => btn.classList.remove('active'));
        tabContainer.querySelectorAll('.code-tab-content').forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        tabContainer.querySelector(`.code-tab-content[data-lang="${lang}"]`).classList.add('active');

        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    },

    toggleDarkMode() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('tlf-darkmode', 'false');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('tlf-darkmode', 'true');
        }
    },

    resetProgress() {
        if (confirm('全ての学習進捗をリセットしますか？この操作は元に戻せません。')) {
            this.progress = {};
            this.quizResults = {};
            localStorage.removeItem('tlf-progress');
            localStorage.removeItem('tlf-quiz-results');
            this.buildSidebar();
            this.updateGlobalProgress();
            this.showDashboard();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
