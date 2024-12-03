package com.ymslx.objectproject.sample4;

import com.ymslx.objectproject.sample4.system.Language;

public class Chinese implements Language {
    private String language;
    @Override
    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String getLanguage() {
        return this.language;
    }
}
