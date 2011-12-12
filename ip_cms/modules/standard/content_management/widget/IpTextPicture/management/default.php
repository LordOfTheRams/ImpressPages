<div class="ipaImageContainer">
    <div class="ipaImage"></div>
    <div class="ipaOptions">
        <label class="ipAdminLabel"><?php echo htmlspecialchars($translations['title']) ?></label>
        <input type="text" class="ipAdminInput ipaImageTitle" name="title" value="<?php echo isset($title) ? htmlspecialchars($title) : ''; ?>" />
    </div>
</div>

<div class="ipaTextarea">
    <textarea name="text">
<?php echo isset($text) ? $text : ''; ?>
    </textarea>
</div>