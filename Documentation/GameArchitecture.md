# Isekai Fantasy Game Architecture

## Server Entry Point (server.ts)

### Server Setup
- Express server running on port 3030
- CORS configuration for allowed origins
- WebSocket support for real-time communication
- Command Line Interface (CLI) for server management

### Middleware Stack
1. CORS handling
2. JSON body parsing
3. Custom logging middleware
4. Error handling middleware
5. Route handling

### WebSocket Integration
- Handles WebSocket upgrades
- Managed through game.webSocketManager
- Used for real-time game events and updates

### CLI Commands
- `characters`: List all character names and IDs
- `character [id]`: Show details of a specific character
- `exit`: Gracefully shut down the server

## Game Core (Game.ts)

### Core Components
1. Character Manager
   - Handles character creation, updates, and deletion
   - Manages character states and interactions

2. Party Manager
   - Manages party formation and disbanding
   - Handles party-based activities and interactions

3. Location Manager
   - Controls game world locations
   - Manages travel between locations

4. WebSocket Manager
   - Handles real-time communication
   - Manages game events and updates

5. Database Integration
   - SQLite database for persistent storage
   - Handles game state persistence

6. Skill Repository
   - Contains all available skills
   - Manages skill learning and usage

7. Travel Manager
   - Handles character and party movement
   - Manages travel-related events

8. Echo Chamber
   - Event broadcasting system
   - Manages game-wide announcements

### Initialization Process
1. Database Initialization
   - Creates necessary tables
   - Loads initial game data

2. Game Component Initialization
   - Loads characters
   - Initializes parties
   - Sets up locations
   - Prepares WebSocket connections

3. Game Timing System
   - Starts game clock
   - Manages scheduled events
   - Handles time-based mechanics

## Enemy System

### Enemy Types
1. Undead (Skeletons)
   - Various skeleton types with different roles
   - Specialized combat abilities

2. Goblins
   - Scout: Light armor, ranged combat
   - Warrior: Melee combat specialist
   - Shaman: Magic user with curses

3. Slimes
   - Basic: Simple melee attacker
   - Fire: Elemental variant
   - Giant: Tank variant

4. Humans
   - Bandit: Light armor fighter
   - Mercenary: Heavy armor warrior
   - Battle Mage: Combat spellcaster

### Enemy Architecture
- Base archetypes for each enemy type
- Customizable stats and abilities
- Drop system for loot
- Position preferences for combat
- Alignment system affecting behavior

## Game Systems

### Combat System
- Turn-based combat
- Position-based tactics
- Skill and equipment integration
- Status effect handling

### Resource System
- Multiple resource types (HP, MP, SP)
- Equipment and items
- Currency (gold)
- Crafting materials

### Character Progression
- Experience and leveling
- Skill learning and improvement
- Equipment upgrades
- Trait system

## Technical Implementation

### Code Organization
- Clear separation of concerns
- Modular design for easy expansion
- Type safety through TypeScript
- Consistent error handling

### Data Flow
1. Client Request → Server
2. Server Validation
3. Game Logic Processing
4. Database Update
5. WebSocket Broadcast
6. Client Update

### Best Practices
- Strong typing for all entities
- Centralized error handling
- Event-driven architecture
- Clean separation of business logic

## Future Considerations

### Scalability
- Consider sharding for multiple game instances
- Optimize database queries
- Implement caching strategies

### Monitoring
- Add performance metrics
- Implement logging system
- Add error tracking

### Features
- Enhanced combat mechanics
- More enemy types
- Advanced crafting system
- Quest system
- Trading system

### Security
- Rate limiting
- Input validation
- Authentication improvements
- Anti-cheat measures 