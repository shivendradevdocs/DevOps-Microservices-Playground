# ---------- BUILD STAGE ----------
    FROM node:18-alpine AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    
    # ---------- PRODUCTION STAGE ----------
    FROM nginx:stable-alpine
    
    # Copy build output
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copy custom nginx config
    COPY nginx/default.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    