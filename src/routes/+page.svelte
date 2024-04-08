<script lang="ts">
  import { page } from "$app/stores";
  import HomeHeader from "$lib/components/HomeHeader.svelte";
  import PostListing from "$lib/components/PostListing.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>CRISPR TECHNOLOGIES</title>
  <meta
    name="description"
    content="CRISPR TECHNIQUES RANGE IN PURPOSE"
  />
  <meta property="og:title" content="CRISPR TECHNIQUES" />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="CRISPR cas9 s not just knockout and knock in"
  />
  <meta property="og:url" content={$page.url.href} />
  <meta
    property="og:description"
    content="gene editing"
  />
</svelte:head>

<HomeHeader />

<section class="pb-6">
  <header
    class="mx-4 mb-4 inline-block
    border-b py-2 dark:border-gray-700"
  >
    <h2 class="text-3xl font-semibold">Blog Posts</h2>
  </header>

  <section class="divide-y dark:divide-gray-700">
    {#each data.posts as post}
      <PostListing {post} />
    {/each}
  </section>
</section>
