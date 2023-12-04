
document.getElementById('startTest').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    // const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const country = document.getElementById('country').value;

    const queryParams = new URLSearchParams({ age, education, country });
    window.location.href = 'test.html?' + queryParams.toString();
});

document.getElementById('startSimpleTest').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    // const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const country = document.getElementById('country').value;

    const queryParams = new URLSearchParams({ age, education, country });
    window.location.href = 'simple_test.html?' + queryParams.toString();
});

document.addEventListener("DOMContentLoaded", function() {
    var image = document.querySelector(".introduction img");
    image.classList.add("floating");
});
