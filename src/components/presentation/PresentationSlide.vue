<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="max-w-4xl w-full mx-auto">
      <div class="bg-white/95 rounded-lg shadow-lg aspect-video p-8">
        <div class="h-full flex flex-col items-center justify-center">
          <h1 class="text-2xl text-green-500 mb-4">Sample PowerPoint Presentation</h1>
          <div class="w-full h-full relative">
            <iframe 
              :src="iframeUrl"
              class="w-full h-full border-none"
              title="Presentation Slide"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const slideUrl = "https://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";
const iframeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(slideUrl)}`;
</script>