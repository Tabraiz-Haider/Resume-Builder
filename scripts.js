document.getElementById('generate-resume').addEventListener('click', function() {
    // Get input values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const bio = document.getElementById('bio').value;

    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const jobDescription = document.getElementById('job-description').value;

    const school = document.getElementById('school').value;
    const degree = document.getElementById('degree').value;

    // Get profile picture (if any)
    const profilePic = document.getElementById('profile-picture').files[0];

    let profilePicUrl = "";
    if (profilePic) {
        const reader = new FileReader();
        reader.onloadend = function () {
            profilePicUrl = reader.result;
            // Generate the preview after loading the image
            generatePreview(profilePicUrl);
        }
        reader.readAsDataURL(profilePic);
    } else {
        generatePreview(profilePicUrl);
    }

    function generatePreview(profilePicUrl) {
        const resume = `
            <div class="resume-section">
                <h2>${fullName}</h2>
                <div class="profile-pic">
                    ${profilePicUrl ? `<img src="${profilePicUrl}" id="profile-pic-preview">` : ""}
                </div>
                <p><span class="highlight">Email:</span> ${email}</p>
                <p><span class="highlight">Phone:</span> ${phone}</p>
                <p><span class="highlight">Bio:</span> ${bio}</p>
            </div>

            <div class="resume-section">
                <h3>Experience</h3>
                <p><span class="highlight">Job Title:</span> ${jobTitle}</p>
                <p><span class="highlight">Company:</span> ${company}</p>
                <p><span class="highlight">Job Description:</span> ${jobDescription}</p>
            </div>

            <div class="resume-section">
                <h3>Education</h3>
                <p><span class="highlight">School/University:</span> ${school}</p>
                <p><span class="highlight">Degree:</span> ${degree}</p>
            </div>
        `;

        // Inject the resume content into the preview section
        document.getElementById('resume').innerHTML = resume;
    }
});

// Adding functionality to download the resume as PDF
document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const resumeContent = document.getElementById('resume').innerHTML;

    doc.html(resumeContent, {
        callback: function (doc) {
            doc.save('resume.pdf'); // Save the file with the name 'resume.pdf'
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 800,
    });
});
