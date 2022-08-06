<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import fetchPexelsImages from "./http/fetchImages"
  import { transformInPascalCamelCase } from "./utils/stringManipulation"

  let images = []
  let show = false

  onMount(() => {
    fetchPexelsImages().then((photos) => {
      images = photos
      show = true
    })
  })
</script>

<main>
  {#if show}
    {#each images as image, i}
      <div class="card_wrapper" transition:fade={{ delay: i * 100 }}>
        <button><a href={image.src.original} target="_blank">View</a></button>
        <div class="card_body">
          <h1>{transformInPascalCamelCase(image.photographer)}</h1>
          <p>{image.alt}</p>
        </div>
        <img src={image.src.portrait} alt={image.alt} />
      </div>
    {/each}
  {/if}
</main>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    max-width: 100vw;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1.5;
    border-radius: 15px;
  }

  .card_wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
  }

  .card_wrapper:hover button {
    transform: translateX(0);
  }

  .card_wrapper:hover .card_body {
    transform: translateY(0);
  }

  button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: red;
    padding: 0.5em 1em;
    border-radius: 2em;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 8px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(150%);
    transition: transform 0.3s ease;
  }

  button a {
    color: white;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
  }

  .card_body:hover h1::after {
    transform: scaleX(1);
  }

  .card_body {
    position: absolute;
    bottom: 0;
    color: white;
    padding: 0.5em 1em;
    background: linear-gradient(transparent, #000);
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    transform: translateY(150%);
    transition: transform 0.3s ease;
    width: -webkit-fill-available;
  }

  h1::after {
    content: "";
    height: 0.3em;
    width: 100%;
    position: absolute;
    background-color: #fff;
    top: 100%;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  h1,
  p {
    font-family: "Roboto", sans-serif;
  }

  h1 {
    position: relative;
  }
</style>
