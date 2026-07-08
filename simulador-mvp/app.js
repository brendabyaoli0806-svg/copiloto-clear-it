document.addEventListener('DOMContentLoaded', () => {
    const btnAnalyze = document.getElementById('btn-analyze');
    const copilotEmpty = document.getElementById('copilot-empty');
    const copilotResults = document.getElementById('copilot-results');
    const analysisSteps = document.querySelectorAll('.analysis-step');
    const feedbackSection = document.querySelector('.feedback-section');
    const btnUseDraft = document.getElementById('btn-use-draft');
    const replyArea = document.getElementById('reply-area');
    const replyInput = document.getElementById('reply-input');
    const cancelReply = document.getElementById('cancel-reply');
    const sendReply = document.getElementById('send-reply');
    const draftText = document.getElementById('draft-text').innerText;
    
    // Simulate Analysis Flow
    btnAnalyze.addEventListener('click', () => {
        btnAnalyze.disabled = true;
        btnAnalyze.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analisando...';
        
        setTimeout(() => {
            copilotEmpty.classList.add('hidden');
            copilotResults.classList.remove('hidden');
            
            // Stagger animation for each step
            analysisSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('show');
                }, index * 800); // 800ms delay between each step
            });
            
            // Show feedback section after all steps
            setTimeout(() => {
                feedbackSection.classList.add('show');
            }, analysisSteps.length * 800 + 500);
            
        }, 1000);
    });

    // Use Draft functionality
    btnUseDraft.addEventListener('click', () => {
        replyArea.classList.remove('hidden');
        replyInput.value = draftText.trim();
        replyInput.focus();
    });

    // Cancel Reply
    cancelReply.addEventListener('click', () => {
        replyArea.classList.add('hidden');
        replyInput.value = '';
    });

    // Send Reply (Simulated)
    sendReply.addEventListener('click', () => {
        if(replyInput.value.trim() === '') return;
        
        const oldText = sendReply.innerHTML;
        sendReply.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        sendReply.disabled = true;

        setTimeout(() => {
            alert('Resposta enviada com sucesso!');
            sendReply.innerHTML = oldText;
            sendReply.disabled = false;
            replyArea.classList.add('hidden');
            replyInput.value = '';
            
            // Change ticket status
            const badge = document.querySelector('.status-badge');
            badge.className = 'status-badge';
            badge.style.background = 'rgba(16, 185, 129, 0.2)';
            badge.style.color = 'var(--success)';
            badge.style.border = '1px solid rgba(16, 185, 129, 0.5)';
            badge.innerText = 'Em Atendimento';
            
        }, 1500);
    });

    // Feedback buttons
    const feedbackBtns = document.querySelectorAll('.feedback-buttons .btn-icon');
    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            feedbackBtns.forEach(b => b.style.color = 'var(--text-secondary)');
            this.style.color = 'var(--accent-primary)';
        });
    });
});
